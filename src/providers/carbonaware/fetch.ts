import { addHours, addMinutes, startOfHour, startOfMinute } from "date-fns/fp";

type CarbonAwareNowResponse = {
  rating: number;
};

const HOST = "https://carbon-aware-api.azurewebsites.net";

export const fetchCarbonAwareForecast = async (region: Region) => {
  const start = addHours(1, startOfHour(new Date())).toISOString();
  const end = addHours(2, startOfHour(new Date())).toISOString();
  const request = await fetch(
    `${HOST}/emissions/forecasts/current?location=${
      region.externalID
    }&dataStartAt=${encodeURIComponent(start)}&dataEndAt=${encodeURIComponent(
      end
    )}&windowSize=10`
  );
  const data: any = await request.json();
  return data;
};

export const fetchCarbonAwareNow = async (
  region: Region,
  prevStart?: Date
): Promise<CarbonAwareNowResponse[]> => {
  const start = prevStart
    ? addMinutes(-10, prevStart).toISOString()
    : addMinutes(-10, startOfMinute(new Date())).toISOString();
  const end = addMinutes(-1, startOfMinute(new Date())).toISOString();

  const request = await fetch(
    `${HOST}/emissions/bylocation?location=${
      region.externalID
    }&startTime=${encodeURIComponent(start)}&endTime=${encodeURIComponent(end)}`
  );

  if (request.status === 200) {
    const data: any = await request.json();
    return data;
  }

  // Get the last known value in 10 minute increments.
  return fetchCarbonAwareNow(region, new Date(start));
};
