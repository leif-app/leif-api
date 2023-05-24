
import { DateTime } from "luxon";

type CarbonIntensityResponse = {
  data: any;
};

export const fetchFromProvider = async (region: Region): Promise<CarbonIntensityResponse> => {
  const start = DateTime.utc().startOf("hour").plus({ hour: 1 }).toISO();
  const end = DateTime.utc().startOf("hour").plus({ hour: 2 }).toISO();
  const url = `https://api.carbonintensity.org.uk/regional/intensity/${start}/${end}/regionid/${region.externalID}`;

  const request = await fetch(url);
  return request.json();
};