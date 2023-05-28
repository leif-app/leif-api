import { addHours, startOfHour } from 'date-fns/esm/fp'

type CarbonIntensityResponse = {
  data: any;
};

export const fetchFromProvider = async (region: Region): Promise<CarbonIntensityResponse> => {
  const start = addHours(1, startOfHour(new Date())).toISOString();
  const end = addHours(2, startOfHour(new Date())).toISOString();
  const url = `https://api.carbonintensity.org.uk/regional/intensity/${start}/${end}/regionid/${region.externalID}`;

  const request = await fetch(url);
  return request.json();
};