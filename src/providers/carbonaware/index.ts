import { addMinutes } from "date-fns";

import { intensityToIndex } from "../../helpers/mapping";
import {
  fetchCarbonAwareForecast,
  fetchCarbonAwareNow,
} from "./fetch";

export const fetchCarbonAware = async (region: Region) => {
  const [forecast, now] = await Promise.all([
    fetchCarbonAwareForecast(region),
    fetchCarbonAwareNow(region),
  ]);

  if (forecast.errors) {
    return { error: "upstream_error" };
  }

  return {
    data: {
      regionID: region.id,
      name: region.name,
      from: new Date().toISOString(),
      to: addMinutes(new Date(), 10).toISOString(),
      optimal: {
        intensity: forecast[0].optimalDataPoints[0].value,
        index: intensityToIndex(forecast[0].optimalDataPoints[0].value),
        from: forecast[0].optimalDataPoints[0].timestamp,
      },
      current: {
        intensity: now[0].rating,
        index: intensityToIndex(now[0].rating),
      },
    },
  };
};
