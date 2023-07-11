import { Hono } from "hono";
import { cache } from "hono/cache";

import countries from "./constants/countries";
import regions from "./constants/regions";
import { fetchCarbonAware, fetchCarbonIntensity } from "./helpers/api";
import { fetchENTSOE } from "./providers/entsoe";
import validateRegion from "./helpers/validation/region";

const app = new Hono();

app.get(
  "*",
  cache({
    cacheName: "api",
    cacheControl: "max-age=600", // 10 minutes
  })
);

app.get("/", async (c) => {
  return c.text("Welcome to the Leif API");
});

app.get("/forecast", async (c) => {
  const result = validateRegion(c);

  if (!result.success || !result.data) {
    return c.json(result);
  }

  switch (result.data.country?.source) {
    case "CarbonAware":
      return c.json(await fetchCarbonAware(result.data.region));
    case "CarbonIntensity":
      return c.json(await fetchCarbonIntensity(result.data.region));
    case "ENTSOE":
      return c.json(
        await fetchENTSOE({
          token: c.env?.ENTSOE_TOKEN,
          territory: result.data.region,
        })
      );
    default:
      return c.json({ error: "missing_source" }, 500);
  }
});

app.get("/countries", async (c) => {
  return c.json({
    data: Object.fromEntries(countries),
  });
});

app.get("/regions", async (c) => {
  const country = c.req.query("country");

  // Return everything if no country is passed
  if (!country) {
    return c.json({
      data: Object.fromEntries(regions),
    });
  }

  const region = regions.get(country);
  if (!region) {
    // If a country is missing regions then it is unsupported
    return c.json({ error: "no_regions" }, 400);
  }

  return c.json({ data: region });
});

export default app;
