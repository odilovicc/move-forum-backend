import "dotenv/config";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { DataSource } from "typeorm";
import { Speaker } from "./speakers/speaker.entity";

interface SpeakerSeed {
  name: string;
  nameEn: string;
  position: string;
  bio: string;
}

const rootDir = process.cwd();

const dataSource = new DataSource({
  type: "postgres",
  url:
    process.env.DATABASE_URL ??
    "postgresql://offered_user:1231230@localhost:5432/offered",
  entities: [Speaker],
  synchronize: true,
});

async function readJson<T>(path: string): Promise<T> {
  const content = await readFile(path, "utf-8");
  return JSON.parse(content) as T;
}

async function seed() {
  const speakersPath = resolve(rootDir, "/var/www/move-forum/src/data/speakers.json");

  const speakersSource = await readJson<{ ru: SpeakerSeed[] }>(speakersPath);

  await dataSource.initialize();

  try {
    const speakerRepo = dataSource.getRepository(Speaker);

    const existingSpeakers = await speakerRepo.find({ order: { order: "ASC" } });
    const speakersToUpdate = existingSpeakers.map((speaker, index) => {
      const source = speakersSource.ru[index];
      if (!source) {
        return null;
      }

      return speakerRepo.create({
        ...speaker,
        name: speaker.name || source.name,
        nameRu: source.name,
        nameEn: speaker.nameEn || source.nameEn,
        position: speaker.position || source.position,
        positionRu: source.position,
        bio: speaker.bio || source.bio,
        bioRu: source.bio,
      });
    }).filter(Boolean) as Speaker[];

    if (speakersToUpdate.length > 0) {
      await speakerRepo.save(speakersToUpdate);
    }

    console.log(`Seed complete: updated ${speakersToUpdate.length} speakers`);
  } finally {
    await dataSource.destroy();
  }
}

seed().catch((error) => {
  console.error("Seed failed", error);
  process.exitCode = 1;
});
