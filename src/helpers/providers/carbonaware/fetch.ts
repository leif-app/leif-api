import { DateTime } from "luxon";

type CarbonAwareNowResponse = {
  rating: number;
};

const HOST = 'https://carbon-aware-api.azurewebsites.net';

export const fetchCarbonAwareForecast = async (region: Region) => {
  const start = DateTime.utc().startOf("hour").plus({ hour: 1 }).toISO() || "";
  const end = DateTime.utc().startOf("hour").plus({ hour: 2 }).toISO() || "";
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
  prevStart?: DateTime
): Promise<CarbonAwareNowResponse[]> => {
  const start =
    (prevStart
      ? prevStart.plus({ minutes: -10 }).toISO()
      : DateTime.utc().startOf("minute").plus({ minutes: -10 }).toISO()) || "";
  const end =
    DateTime.utc().startOf("minute").plus({ minutes: -1 }).toISO() || "";

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
  return fetchCarbonAwareNow(region, DateTime.fromISO(start));
};