import { QueryGL, Area, DocumentType, ProcessType } from "entsoe-api-client";

const test = async ({ token, territory }) => {
  // Prepare dates
  const dateToday = new Date(),
    dateTomorrow = new Date();

  dateToday.setDate(dateToday.getDate());
  dateToday.setHours(0, 0, 0, 0);
  dateTomorrow.setDate(dateToday.getDate() + 1);
  dateTomorrow.setHours(0, 0, 0, 0);

  // Run ENTSO-e transparency platform query
  const consumption = await QueryGL(token, {
    documentType: DocumentType("System total load") || "",
    processType: ProcessType("Day ahead"),
    outBiddingZoneDomain: Area(territory.externalID),
    startDateTime: dateToday, // Start date
    endDateTime: dateTomorrow, // End date
  });

  return consumption;
};

export default test;
