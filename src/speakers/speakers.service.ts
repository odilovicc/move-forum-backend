import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Speaker } from './speaker.entity';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';

@Injectable()
export class SpeakersService {
  constructor(
    @InjectRepository(Speaker)
    private readonly repo: Repository<Speaker>,
  ) {}

  findAll() {
    return this.repo.find({ order: { order: 'ASC' } }).then((speakers) => {
      return speakers.map((speaker) => ({
        ...speaker,
        photo: this.normalizePhoto(speaker.photo),
      }));
    });
  }

  async findOne(id: number) {
    const speaker = await this.repo.findOneBy({ id });
    if (!speaker) throw new NotFoundException(`Speaker #${id} not found`);
    return {
      ...speaker,
      photo: this.normalizePhoto(speaker.photo),
    };
  }

  async create(dto: CreateSpeakerDto) {
    if (dto.order === undefined) {
      const max = await this.repo
        .createQueryBuilder('s')
        .select('MAX(s.order)', 'maxOrder')
        .getRawOne();
      dto.order = (max?.maxOrder ?? -1) + 1;
    }
    const normalized = this.normalizeDto(dto);
    const speaker = this.repo.create(normalized);
    return this.repo.save(speaker);
  }

  async update(id: number, dto: UpdateSpeakerDto) {
    const speaker = await this.findOne(id);
    const normalized = this.normalizeDto(dto);
    Object.assign(speaker, normalized);
    return this.repo.save(speaker);
  }

  async updatePhoto(id: number, photoPath: string) {
    return this.update(id, { photo: photoPath });
  }

  async reorder(ids: number[]) {
    const updates = ids.map((id, index) =>
      this.repo.update(id, { order: index }),
    );
    await Promise.all(updates);
    return this.findAll();
  }

  async remove(id: number) {
    const speaker = await this.repo.findOneBy({ id });
    if (!speaker) throw new NotFoundException(`Speaker #${id} not found`);
    return this.repo.remove(speaker);
  }

  private normalizePhoto(photo: string | null | undefined) {
    if (!photo) {
      return '';
    }

    if (
      photo.startsWith('/uploads/') ||
      photo.startsWith('http://') ||
      photo.startsWith('https://')
    ) {
      return photo;
    }

    return '';
  }

  private normalizeDto(dto: CreateSpeakerDto | UpdateSpeakerDto) {
    const normalized = { ...dto } as Record<string, unknown>;

    const nameRu = (dto as CreateSpeakerDto).nameRu ?? dto.name;
    const positionRu = (dto as CreateSpeakerDto).positionRu ?? dto.position;
    const bioRu = (dto as CreateSpeakerDto).bioRu ?? dto.bio;

    if (nameRu) {
      normalized.nameRu = nameRu;
    }
    if (positionRu) {
      normalized.positionRu = positionRu;
    }
    if (bioRu) {
      normalized.bioRu = bioRu;
    }

    if (!dto.name && nameRu) {
      normalized.name = nameRu;
    }
    if (!dto.position && positionRu) {
      normalized.position = positionRu;
    }
    if (!dto.bio && bioRu) {
      normalized.bio = bioRu;
    }

    return normalized;
  }
}
