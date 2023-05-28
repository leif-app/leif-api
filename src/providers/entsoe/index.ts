import IntervalTree from "@flatten-js/interval-tree";

import fuelIntensities from "../../constants/fuels";
import { calculateCt } from "../../helpers/intensity";
import fetchGeneration from "./generation";
import fetchConsumption from "./consumption";
import { convertEntsoePSRTypeToFuel } from "../../helpers/mapping";

// TODO, handle caching and errors. Somehow serialise trees to KV.

export const test = async (token) => {
  // MAW = 1 Megawatt = 1000 Kilowatts

  const [generation, consumption] = await Promise.all([
    await fetchGeneration(token),
    await fetchConsumption(token),
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

  let demand = [0];

  consumptionTree.search(
    [
      Date.now(),
      Date.now(),
    ],
    (point) => {
      demand = [point.quantity * 1000];
      return point;
    }
  )[0];

  let fuels = [0];
  let generationToKwH = [[0]];
  generationTree.search(
    [
      Date.now(),
      Date.now(),
    ],
    (interval) => {
      fuels = Object.keys(interval.fuels).map((k) => {
        return fuelIntensities.get(k) * 1000;
      });

      generationToKwH = Object.keys(interval.fuels).map((k) => {
        return [interval.fuels[k] || 0 * 1000];
      });
    }
  )[0];

  const Ct = calculateCt(generationToKwH, fuels, demand, 0);

  return Ct;
};
