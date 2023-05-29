import IntervalTree from "@flatten-js/interval-tree";

import { convertEntsoePSRTypeToFuel } from "../../helpers/mapping";
import fuelIntensities from "../../constants/fuels";
import { calculateCt } from "../../helpers/intensity";
import fetchGeneration from "./generation";
import fetchConsumption from "./consumption";
/**
 * TODO
 * plan out all the below
 * handle caching
 * handle errors
 * handle missing data (extrapolate from last known value?)
 * pass in territory
 * serialise trees to KV somehow
 * handle external updating via cron
 * format response to find optimal time and current
 * utilise lerp to get the in-between values
 * find territory-specific fuel intensity values
 *
 */

export const fetchENTSOE = async ({ territory, token }) => {
  // MAW = 1 Megawatt = 1000 Kilowatts

  console.log({ territory, token });

  const [generation, consumption] = await Promise.all([
    await fetchGeneration({ territory, token }),
    await fetchConsumption({ territory, token }),
  ]);

  const generationTree = new IntervalTree();

  // Data is segmented by fuel type where we're concerned with time.
  // Loop over timeseries to get all fuel types (fuels may be repeated)
  // Within timeseries loop over periods and points to get the
  // interval and quantity of MAW used.
  const collatedData = new Map();
  generation.forEach((document) => {
    document.timeseries.forEach((entry) => {
      entry.periods?.forEach((period) => {
        period.points.forEach((point) => {
          const key = point.startDate.getTime();
          const fuel =
            convertEntsoePSRTypeToFuel(entry.mktPsrType || "") || "other_other";
          if (collatedData.has(key)) {
            const currentValues = collatedData.get(key);
            collatedData.delete(key);
            collatedData.set(key, {
              ...currentValues,
              fuels: {
                ...currentValues.fuels,
                [fuel]:
                  currentValues.fuels[fuel] && point.quantity
                    ? currentValues.fuels[fuel] + point.quantity
                    : point.quantity,
              },
            });
          } else {
            collatedData.set(key, {
              start: key,
              end: point.endDate.getTime() - 1,
              fuels: {
                [fuel]: point.quantity,
              },
            });
          }
        });
      });
    });
  });

  collatedData.forEach((value) => {
    generationTree.insert([value.start, value.end], value);
  });

  const consumptionTree = new IntervalTree();

  consumption.forEach((document) => {
    document.timeseries.forEach((entry) => {
      entry.periods?.forEach((period) => {
        period.points.forEach((point) => {
          const low = point.startDate.getTime();
          const high = point.endDate.getTime() - 1;
          consumptionTree.insert([low, high], point);
        });
      });
    });
  });

  const demand = consumptionTree.search([Date.now(), Date.now()], (point) => {
    return point.quantity * 1000;
  });

  let fuels = [0];
  let generationToKwH = [[0]];
  generationTree.search([Date.now(), Date.now()], (interval) => {
    fuels = Object.keys(interval.fuels).map((k) => {
      return fuelIntensities.get(territory).get(k) * 1000;
    });

    generationToKwH = Object.keys(interval.fuels).map((k) => {
      return [interval.fuels[k] || 0 * 1000];
    });
  })[0];

  const Ct = calculateCt(generationToKwH, fuels, demand, 0);

  console.log(JSON.stringify({ generationToKwH, fuels, demand }, null, 2));

  return Ct;
};
