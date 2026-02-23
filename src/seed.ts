import "dotenv/config";
import { readFile, readdir } from "node:fs/promises";
import { resolve, extname } from "node:path";
import { DataSource } from "typeorm";
import { Speaker } from "./speakers/speaker.entity";
import { FaqItem } from "./faq/faq-item.entity";
import { LocaleEntry } from "./locales/locale-entry.entity";
import { DEFAULT_LOCALE_ENTRIES } from "./locales/locales.defaults";

const rootDir = process.cwd();
const DEFAULT_DB_URL =
  "postgresql://offered_user:1231230@localhost:5432/offered";

const dataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL ?? DEFAULT_DB_URL,
  entities: [Speaker, FaqItem, LocaleEntry],
  synchronize: true,
});

async function readJson<T>(path: string): Promise<T> {
  const content = await readFile(path, "utf-8");
  return JSON.parse(content) as T;
}

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

async function loadLocaleEntries() {
  const localesDir =
    process.env.LOCALES_DIR ??
    resolve(rootDir, "../front/src/locales");
  const entries: LocaleEntry[] = [];

  try {
    const files = await readdir(localesDir);
    const localeFiles = files.filter((file) => extname(file) === ".json");

    for (const file of localeFiles) {
      const locale = file.replace(/\.json$/i, "");
      const data = await readJson<Record<string, unknown>>(
        resolve(localesDir, file),
      );
      const flat = flattenLocale(data);
      for (const [key, value] of Object.entries(flat)) {
        entries.push({ locale, key, value } as LocaleEntry);
      }
    }
  } catch (error) {
    console.warn(
      `Locales directory not found (${localesDir}), only defaults will be seeded.`,
    );
  }

  for (const entry of DEFAULT_LOCALE_ENTRIES) {
    entries.push(entry as LocaleEntry);
  }

  const unique = new Map<string, LocaleEntry>();
  for (const entry of entries) {
    unique.set(`${entry.locale}:${entry.key}`, entry);
  }
  return Array.from(unique.values());
}

async function seedLocales() {
  const localeRepo = dataSource.getRepository(LocaleEntry);
  const entries = await loadLocaleEntries();
  if (entries.length === 0) {
    console.warn("No locale entries found, skipping locale seed.");
    return;
  }

  const existing = await localeRepo.find({
    select: ["locale", "key", "value"],
  });
  const existingMap = new Map(
    existing.map((entry) => [`${entry.locale}:${entry.key}`, entry.value]),
  );

  const toInsert: LocaleEntry[] = [];
  const toUpdate: LocaleEntry[] = [];

  for (const entry of entries) {
    const mapKey = `${entry.locale}:${entry.key}`;
    const currentValue = existingMap.get(mapKey);
    if (currentValue === undefined) {
      toInsert.push(entry);
      continue;
    }
    if (currentValue === "" || currentValue === entry.key) {
      toUpdate.push(entry);
    }
  }

  if (toInsert.length === 0 && toUpdate.length === 0) {
    console.log("Locales seed skipped: нет новых ключей или пустых значений.");
    return;
  }

  if (toInsert.length > 0) {
    await localeRepo.insert(toInsert);
  }
  if (toUpdate.length > 0) {
    await localeRepo.upsert(toUpdate, ["locale", "key"]);
  }

  console.log(
    `Locales seeded: ${toInsert.length} новых, ${toUpdate.length} обновлено`,
  );
}

async function seedSpeakers() {
  const speakersPath = process.env.SPEAKERS_SEED_PATH;
  if (!speakersPath) {
    console.log("SPEAKERS_SEED_PATH not set, skipping speakers seed.");
    return;
  }

  const speakerRepo = dataSource.getRepository(Speaker);
  const force = process.env.SEED_FORCE === "1";
  const existing = await speakerRepo.count();
  if (existing > 0 && !force) {
    console.log("Speakers already exist, skipping. Set SEED_FORCE=1 to overwrite.");
    return;
  }

  const source = await readJson<Speaker[]>(resolve(rootDir, speakersPath));
  if (force && existing > 0) {
    await speakerRepo.clear();
  }

  const toInsert = source.map((speaker, index) =>
    speakerRepo.create({
      ...speaker,
      order: speaker.order ?? index,
    }),
  );

  await speakerRepo.save(toInsert);
  console.log(`Speakers seeded: ${toInsert.length} items`);
}

async function seedFaq() {
  const faqPath = process.env.FAQ_SEED_PATH;
  if (!faqPath) {
    console.log("FAQ_SEED_PATH not set, skipping FAQ seed.");
    return;
  }

  const faqRepo = dataSource.getRepository(FaqItem);
  const force = process.env.SEED_FORCE === "1";
  const existing = await faqRepo.count();
  if (existing > 0 && !force) {
    console.log("FAQ items already exist, skipping. Set SEED_FORCE=1 to overwrite.");
    return;
  }

  const source = await readJson<FaqItem[]>(resolve(rootDir, faqPath));
  if (force && existing > 0) {
    await faqRepo.clear();
  }

  const toInsert = source.map((item, index) =>
    faqRepo.create({
      ...item,
      order: item.order ?? index,
    }),
  );

  await faqRepo.save(toInsert);
  console.log(`FAQ seeded: ${toInsert.length} items`);
}

async function seed() {
  await dataSource.initialize();

  try {
    await seedLocales();
    await seedSpeakers();
    await seedFaq();
  } finally {
    await dataSource.destroy();
  }
}

seed().catch((error) => {
  console.error("Seed failed", error);
  process.exitCode = 1;
});
