"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const typeorm_1 = require("typeorm");
const speaker_entity_1 = require("./speakers/speaker.entity");
const faq_item_entity_1 = require("./faq/faq-item.entity");
const locale_entry_entity_1 = require("./locales/locale-entry.entity");
const rootDir = process.cwd();
const dataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL ??
        "postgresql://postgres:postgres@localhost:5432/offered",
    entities: [speaker_entity_1.Speaker, faq_item_entity_1.FaqItem, locale_entry_entity_1.LocaleEntry],
    synchronize: true,
});
async function readJson(path) {
    const content = await (0, promises_1.readFile)(path, "utf-8");
    return JSON.parse(content);
}
function flattenObject(input, prefix = "") {
    const result = {};
    for (const [key, value] of Object.entries(input)) {
        const nextKey = prefix ? `${prefix}.${key}` : key;
        if (value !== null && typeof value === "object" && !Array.isArray(value)) {
            Object.assign(result, flattenObject(value, nextKey));
            continue;
        }
        result[nextKey] = String(value ?? "");
    }
    return result;
}
async function seed() {
    const speakersPath = (0, node_path_1.resolve)(rootDir, "../front/src/data/speakers.json");
    const faqPath = (0, node_path_1.resolve)(rootDir, "../front/src/data/faq.json");
    const ruLocalePath = (0, node_path_1.resolve)(rootDir, "../front/src/locales/ru.json");
    const uzLocalePath = (0, node_path_1.resolve)(rootDir, "../front/src/locales/uz.json");
    const speakersSource = await readJson(speakersPath);
    const faqSource = await readJson(faqPath);
    const ruLocale = await readJson(ruLocalePath);
    const uzLocale = await readJson(uzLocalePath);
    const localeMap = {
        ru: ruLocale,
        uz: uzLocale,
        en: ruLocale,
    };
    await dataSource.initialize();
    try {
        await dataSource.query("TRUNCATE TABLE locale_entries, faq_items, speakers RESTART IDENTITY CASCADE");
        const speakerRepo = dataSource.getRepository(speaker_entity_1.Speaker);
        const faqRepo = dataSource.getRepository(faq_item_entity_1.FaqItem);
        const localeRepo = dataSource.getRepository(locale_entry_entity_1.LocaleEntry);
        const speakers = speakersSource.ru.map((item, index) => speakerRepo.create({
            name: item.name,
            nameEn: item.nameEn,
            photo: item.photo ?? "",
            position: item.position,
            bio: item.bio,
            order: index,
        }));
        const faqItems = faqSource.ru.map((item, index) => faqRepo.create({
            question: item.question,
            answer: item.answer,
            order: index,
        }));
        const localeEntries = Object.entries(localeMap).flatMap(([locale, data]) => {
            const flat = flattenObject(data);
            return Object.entries(flat).map(([key, value]) => localeRepo.create({
                locale,
                key,
                value,
            }));
        });
        await speakerRepo.save(speakers);
        await faqRepo.save(faqItems);
        await localeRepo.save(localeEntries);
        console.log(`Seed complete: ${speakers.length} speakers`);
        console.log(`Seed complete: ${faqItems.length} FAQ items`);
        console.log(`Seed complete: ${localeEntries.length} locale entries`);
    }
    finally {
        await dataSource.destroy();
    }
}
seed().catch((error) => {
    console.error("Seed failed", error);
    process.exitCode = 1;
});
//# sourceMappingURL=seed.js.map