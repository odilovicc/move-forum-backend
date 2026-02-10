import { Repository } from 'typeorm';
import { FaqItem } from './faq-item.entity';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
export declare class FaqService {
    private readonly repo;
    constructor(repo: Repository<FaqItem>);
    findAll(): Promise<FaqItem[]>;
    findOne(id: number): Promise<FaqItem>;
    create(dto: CreateFaqDto): Promise<FaqItem>;
    update(id: number, dto: UpdateFaqDto): Promise<FaqItem>;
    remove(id: number): Promise<FaqItem>;
    reorder(ids: number[]): Promise<FaqItem[]>;
}
