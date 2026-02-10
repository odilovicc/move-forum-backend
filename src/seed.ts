import "dotenv/config";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { DataSource } from "typeorm";
import { Speaker } from "./speakers/speaker.entity";
import { FaqItem } from "./faq/faq-item.entity";
import { LocaleEntry } from "./locales/locale-entry.entity";

interface SpeakerSeed {
  name: string;
  nameEn: string;
  photo?: string;
  position: string;
  bio: string;
}

interface FaqSeed {
  question: string;
  answer: string;
}

type NestedValue = string | number | boolean | null | NestedObject;
interface NestedObject {
  [key: string]: NestedValue;
}

const rootDir = process.cwd();

const dataSource = new DataSource({
  type: "postgres",
  url:
    process.env.DATABASE_URL ??
    "postgresql://postgres:postgres@localhost:5432/offered",
  entities: [Speaker, FaqItem, LocaleEntry],
  synchronize: true,
});

async function readJson<T>(path: string): Promise<T> {
  const content = await readFile(path, "utf-8");
  return JSON.parse(content) as T;
}

function flattenObject(
  input: NestedObject,
  prefix = "",
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(input)) {
    const nextKey = prefix ? `${prefix}.${key}` : key;

    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value as NestedObject, nextKey));
      continue;
    }

    result[nextKey] = String(value ?? "");
  }

  return result;
}

async function seed() {
  const speakersPath = resolve(rootDir, "../front/src/data/speakers.json");
  const faqPath = resolve(rootDir, "../front/src/data/faq.json");
  const ruLocalePath = resolve(rootDir, "../front/src/locales/ru.json");
  const uzLocalePath = resolve(rootDir, "../front/src/locales/uz.json");

  const speakersSource = await readJson<{ ru: SpeakerSeed[] }>(speakersPath);
  const faqSource = await readJson<{ ru: FaqSeed[] }>(faqPath);
  const ruLocale = await readJson<NestedObject>(ruLocalePath);
  const uzLocale = await readJson<NestedObject>(uzLocalePath);

  const localeMap: Record<string, NestedObject> = {
    ru: ruLocale,
    uz: uzLocale,
    en: ruLocale,
  };

  await dataSource.initialize();

  try {
    await dataSource.query(
      "TRUNCATE TABLE locale_entries, faq_items, speakers RESTART IDENTITY CASCADE",
    );

    const speakerRepo = dataSource.getRepository(Speaker);
    const faqRepo = dataSource.getRepository(FaqItem);
    const localeRepo = dataSource.getRepository(LocaleEntry);

    const speakers = speakersSource.ru.map((item, index) =>
      speakerRepo.create({
        name: item.name,
        nameEn: item.nameEn,
        photo: item.photo ?? "",
        position: item.position,
        bio: item.bio,
        order: index,
      }),
    );

    const faqItems = faqSource.ru.map((item, index) =>
      faqRepo.create({
        question: item.question,
        answer: item.answer,
        order: index,
      }),
    );

    const localeEntries = Object.entries(localeMap).flatMap(([locale, data]) => {
      const flat = flattenObject(data);
      return Object.entries(flat).map(([key, value]) =>
        localeRepo.create({
          locale,
          key,
          value,
        }),
      );
    });

    await speakerRepo.save(speakers);
    await faqRepo.save(faqItems);
    await localeRepo.save(localeEntries);

    console.log(`Seed complete: ${speakers.length} speakers`);
    console.log(`Seed complete: ${faqItems.length} FAQ items`);
    console.log(`Seed complete: ${localeEntries.length} locale entries`);
  } finally {
    await dataSource.destroy();
  }
}

seed().catch((error) => {
  console.error("Seed failed", error);
  process.exitCode = 1;
});
