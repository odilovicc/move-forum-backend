/**
 * Seed script that FORCE-UPDATES only schedule.* locale keys in the database.
 *
 * It reads the three JSON locale files (ru, uz, en), extracts every key that
 * starts with "schedule.", and upserts them into the locale_entries table —
 * overwriting whatever value is currently stored.
 *
 * Usage:
 *   npx ts-node -r tsconfig-paths/register src/seed-locales.ts
 */
import "dotenv/config";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { DataSource } from "typeorm";
import { LocaleEntry } from "./locales/locale-entry.entity";

const rootDir = process.cwd();
const DEFAULT_DB_URL =
  "postgresql://offered_user:1231230@localhost:5432/offered";

const dataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL ?? DEFAULT_DB_URL,
  entities: [LocaleEntry],
  synchronize: false,
});

function flattenLocale(
  obj: Record<string, unknown>,
  prefix = "",
  out: Record<string, string> = {},
) {
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      flattenLocale(value as Record<string, unknown>, path, out);
    } else {
      out[path] = value === undefined || value === null ? "" : String(value);
    }
  }
  return out;
}

async function run() {
  await dataSource.initialize();

  const localeRepo = dataSource.getRepository(LocaleEntry);
  const localesDir =
    process.env.LOCALES_DIR ?? resolve(rootDir, "../front/src/locales");

  const locales = ["ru", "uz", "en"];
  const entries: { locale: string; key: string; value: string }[] = [];

  for (const locale of locales) {
    const filePath = resolve(localesDir, `${locale}.json`);
    const raw = await readFile(filePath, "utf-8");
    const data = JSON.parse(raw) as Record<string, unknown>;
    const flat = flattenLocale(data);

    for (const [key, value] of Object.entries(flat)) {
      if (key.startsWith("schedule.")) {
        entries.push({ locale, key, value });
      }
    }
  }

  if (entries.length === 0) {
    console.log("No schedule.* keys found in locale files.");
    await dataSource.destroy();
    return;
  }

  // Delete old schedule keys that no longer exist in the JSON files
  const newKeys = new Set(entries.map((e) => `${e.locale}:${e.key}`));
  const existing = await localeRepo.find({
    select: ["locale", "key"],
  });
  const toDelete = existing.filter(
    (e) => e.key.startsWith("schedule.") && !newKeys.has(`${e.locale}:${e.key}`),
  );

  if (toDelete.length > 0) {
    for (const entry of toDelete) {
      await localeRepo.delete({ locale: entry.locale, key: entry.key });
    }
    console.log(`Deleted ${toDelete.length} obsolete schedule.* keys.`);
  }

  // Force upsert all current schedule keys
  await localeRepo.upsert(
    entries.map((e) => localeRepo.create(e)),
    ["locale", "key"],
  );

  console.log(
    `Force-updated ${entries.length} schedule.* locale entries across ${locales.length} locales.`,
  );

  await dataSource.destroy();
}

run().catch((err) => {
  console.error("Locale seed failed:", err);
  process.exitCode = 1;
});
