import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FaqItem } from './faq-item.entity';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(FaqItem)
    private readonly repo: Repository<FaqItem>,
  ) {}

  findAll() {
    return this.repo.find({ order: { order: 'ASC' } });
  }

  async findOne(id: number) {
    const item = await this.repo.findOneBy({ id });
    if (!item) throw new NotFoundException(`FAQ #${id} not found`);
    return item;
  }

  async create(dto: CreateFaqDto) {
    if (dto.order === undefined) {
      const max = await this.repo
        .createQueryBuilder('f')
        .select('MAX(f.order)', 'maxOrder')
        .getRawOne();
      dto.order = (max?.maxOrder ?? -1) + 1;
    }
    const item = this.repo.create(dto);
    return this.repo.save(item);
  }

  async update(id: number, dto: UpdateFaqDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repo.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    return this.repo.remove(item);
  }

  async reorder(ids: number[]) {
    const updates = ids.map((id, index) =>
      this.repo.update(id, { order: index }),
    );
    await Promise.all(updates);
    return this.findAll();
  }
}
