import { Repository } from 'typeorm';
import { Speaker } from './speaker.entity';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';
export declare class SpeakersService {
    private readonly repo;
    constructor(repo: Repository<Speaker>);
    findAll(): Promise<{
        photo: string;
        id: number;
        name: string;
        nameEn: string;
        position: string;
        bio: string;
        order: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        photo: string;
        id: number;
        name: string;
        nameEn: string;
        position: string;
        bio: string;
        order: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(dto: CreateSpeakerDto): Promise<Speaker>;
    update(id: number, dto: UpdateSpeakerDto): Promise<{
        photo: string;
        id: number;
        name: string;
        nameEn: string;
        position: string;
        bio: string;
        order: number;
        createdAt: Date;
        updatedAt: Date;
    } & Speaker>;
    updatePhoto(id: number, photoPath: string): Promise<{
        photo: string;
        id: number;
        name: string;
        nameEn: string;
        position: string;
        bio: string;
        order: number;
        createdAt: Date;
        updatedAt: Date;
    } & Speaker>;
    reorder(ids: number[]): Promise<{
        photo: string;
        id: number;
        name: string;
        nameEn: string;
        position: string;
        bio: string;
        order: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    remove(id: number): Promise<Speaker>;
    private normalizePhoto;
}
