import { Hono } from "hono";
import { cache } from "hono/cache";

import countries from "./constants/countries";
import regions from "./constants/regions";
import { fetchCarbonAware, fetchCarbonIntensity } from "./helpers/api";

const app = new Hono();

app.get(
  "*",
  cache({
    cacheName: "api",
    cacheControl: "max-age=600", // 10 minutes
  })
);

app.get("/api", async (c) => {
  return c.text("Welcome to the Leif API");
});

app.get("/api/forecast", async (c) => {
  const regionID = c.req.query("region");
  const [countryID] = c.req.query("region")?.split("-") || "";

  if (!countryID || !regionID) {
    return c.json({ error: "invalid_region_id" });
  }

  const country = countries.get(countryID);

  const region = regions.get(countryID)?.filter((item) => {
    return item.id === regionID;
  })[0];

  if (!region) {
    return c.json({ error: "invalid_region" }, 400);
  }

  switch (country?.source) {
    case "CarbonAware":
      return c.json(await fetchCarbonAware(region));
    case "CarbonIntensity":
      return c.json(await fetchCarbonIntensity(region));
    default:
      return c.json({ error: "missing_source" }, 500);
  }
});

app.get("/api/countries", async (c) => {
  return c.json({
    data: Object.fromEntries(countries),
  });
});

app.get("/api/regions", async (c) => {
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
