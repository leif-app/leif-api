import { QueryGL, Area, DocumentType, ProcessType } from "entsoe-api-client";

const test = async (token) => {
  // Prepare dates
  const dateToday = new Date(),
    dateTomorrow = new Date();

  dateToday.setDate(dateToday.getDate());
  dateToday.setHours(0, 0, 0, 0);
  dateTomorrow.setDate(dateToday.getDate() + 2);
  dateTomorrow.setHours(0, 0, 0, 0);

  // Run ENTSO-e transparency platform query
  const result = await QueryGL(token, {
    documentType: DocumentType("Actual generation per type") || "",
    processType: ProcessType("Realised"),
    inDomain: Area("Germany (DE)"), // In_Domain
    startDateTime: dateToday, // Start date
    endDateTime: dateTomorrow, // End date
  });

  return result;
};

export default test;