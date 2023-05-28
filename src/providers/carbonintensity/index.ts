import { addMinutes } from "date-fns";

import { intensityToIndex } from "../../helpers/mapping";
import { fetchFromProvider } from "./fetch";

type Point = {
  intensity: {
    forecast: number;
  };
};

export const fetchCarbonIntensity = async (region: Region) => {
  const data = await fetchFromProvider(region);

  const current = data.data.data[0];
  const optimal = data.data.data.reduce(
    (accum: Point, point: Point) => {
      if (point.intensity.forecast < accum.intensity.forecast) {
        return point;
      }
      return accum;
    },
    { intensity: { forecast: Infinity } }
  );

  return {
    data: {
      regionID: region.id,
      name: region.name,
      from: new Date().toISOString(),
      to: addMinutes(new Date(), 10).toISOString(),
      optimal: {
        intensity: optimal.intensity.forecast,
        index: intensityToIndex(optimal.intensity.forecast),
        from: optimal.from,
      },
      current: {
        intensity: current.intensity.forecast,
        index: intensityToIndex(current.intensity.forecast),
      },
    },
  };
};
