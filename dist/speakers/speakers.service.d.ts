import { Repository } from 'typeorm';
import { Speaker } from './speaker.entity';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';
export declare class SpeakersService {
    private readonly repo;
    constructor(repo: Repository<Speaker>);
    findAll(): Promise<Speaker[]>;
    findOne(id: number): Promise<Speaker>;
    create(dto: CreateSpeakerDto): Promise<Speaker>;
    update(id: number, dto: UpdateSpeakerDto): Promise<Speaker>;
    remove(id: number): Promise<Speaker>;
}
