import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
export declare class FaqController {
    private readonly faqService;
    constructor(faqService: FaqService);
    findAll(): Promise<import("./faq-item.entity").FaqItem[]>;
    findOne(id: number): Promise<import("./faq-item.entity").FaqItem>;
    create(dto: CreateFaqDto): Promise<import("./faq-item.entity").FaqItem>;
    update(id: number, dto: UpdateFaqDto): Promise<import("./faq-item.entity").FaqItem>;
    remove(id: number): Promise<import("./faq-item.entity").FaqItem>;
    reorder(body: {
        ids: number[];
    }): Promise<import("./faq-item.entity").FaqItem[]>;
}
