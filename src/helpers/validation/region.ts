import type { Context } from "hono";
import countries from "../../constants/countries";
import regions from "../../constants/regions";

function validateRegion(c: Context) {
  const regionID = c.req.query("region");
  const [countryID] = c.req.query("region")?.split("-") || "";

  if (!countryID || !regionID) {
    return {
      success: false,
      error: "invalid_region_id",
      status: 400
    };
  }

  const country = countries.get(countryID);

  const region = regions.get(countryID)?.filter((item) => {
    return item.id === regionID;
  })[0];

  if (!region) {
    return {
      success: false,
      error: "invalid_region",
      status: 400
    };
  }

  return {
    success: true,
    data: {
      country,
      region
    }
  };
}

export default validateRegion;
