import { DateTime } from "luxon";

import { intensityToIndex } from "../../mapping";
import { fetchCarbonAwareForecast, fetchCarbonAwareNow } from "../carbonaware/fetch";

export const fetchCarbonAware = async (region: Region) => {
  const [forecast, now] = await Promise.all([
    fetchCarbonAwareForecast(region),
    fetchCarbonAwareNow(region),
  ]);

  if (forecast.errors) {
    return { error: "upstream_error", };
  }

  return {
    data: {
      regionID: region.id,
      name: region.name,
      from: DateTime.utc().toISO(),
      to: DateTime.utc().plus({ minutes: 10 }).toISO(),
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