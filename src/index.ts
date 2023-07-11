import { cache } from "hono/cache";
import { drizzle } from 'drizzle-orm/d1';
import { Hono } from "hono";

import type { Context } from 'hono';
import type { DrizzleD1Database } from 'drizzle-orm/d1';

import countries from "./constants/countries";
import regions from "./constants/regions";
import { fetchCarbonAware, fetchCarbonIntensity } from "./helpers/api";
import { fetchENTSOE } from "./providers/entsoe";
import validateRegion from "./helpers/validation/region";
import { carbon } from './schema';

type ContextVariables = {
  db: DrizzleD1Database
}

const app = new Hono<{ Variables: ContextVariables }>();

app.get(
  "*",
  cache({
    cacheName: "api",
    cacheControl: "max-age=600", // 10 minutes
  })
);

async function injectDB(context: Context, next: Function) {
	const db = drizzle(context.env.DB);
	context.set('db', db);
  await next()
}

app.use('*', injectDB);


app.get("/", async (c) => {
  return c.text("Welcome to the Leif API");
});

app.get("/carbon", async (c) => {
  const db = c.get('db');
  const query = await db.select().from(carbon);
  const result = await query.all();
  console.log('result', result)
  return c.json(result);
});

app.post("/carbon", async (c) => {
  const db = c.get('db');
  const body = await c.req.json();
  const { amount, user_id } = body;
  const time_from = new Date().toISOString()
  const time_to = new Date().toISOString()
  const created_at = new Date().toISOString()
  const inserted = await db.insert(carbon).values({
    amount,
    user_id,
    time_from,
    time_to,
    created_at,
  }).returning();
  console.log('inserted', inserted)
  const result = await inserted.all()
  return c.json(result[0]);
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
