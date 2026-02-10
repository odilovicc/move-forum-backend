import { SpeakersService } from './speakers.service';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';
export declare class SpeakersController {
    private readonly speakersService;
    constructor(speakersService: SpeakersService);
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
    create(dto: CreateSpeakerDto): Promise<import("./speaker.entity").Speaker>;
    reorder(body: {
        ids: number[];
    }): Promise<{
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
    uploadPhoto(id: number, file: {
        filename: string;
    }): Promise<{
        photo: string;
        id: number;
        name: string;
        nameEn: string;
        position: string;
        bio: string;
        order: number;
        createdAt: Date;
        updatedAt: Date;
    } & import("./speaker.entity").Speaker>;
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
    } & import("./speaker.entity").Speaker>;
    remove(id: number): Promise<import("./speaker.entity").Speaker>;
}
