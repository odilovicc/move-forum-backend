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
    return this.repo.find({ order: { order: 'ASC' } });
  }

  async findOne(id: number) {
    const speaker = await this.repo.findOneBy({ id });
    if (!speaker) throw new NotFoundException(`Speaker #${id} not found`);
    return speaker;
  }

  async create(dto: CreateSpeakerDto) {
    if (dto.order === undefined) {
      const max = await this.repo
        .createQueryBuilder('s')
        .select('MAX(s.order)', 'maxOrder')
        .getRawOne();
      dto.order = (max?.maxOrder ?? -1) + 1;
    }
    const speaker = this.repo.create(dto);
    return this.repo.save(speaker);
  }

  async update(id: number, dto: UpdateSpeakerDto) {
    const speaker = await this.findOne(id);
    Object.assign(speaker, dto);
    return this.repo.save(speaker);
  }

  async remove(id: number) {
    const speaker = await this.findOne(id);
    return this.repo.remove(speaker);
  }
}
