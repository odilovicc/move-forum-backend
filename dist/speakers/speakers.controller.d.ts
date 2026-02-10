import { SpeakersService } from './speakers.service';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';
export declare class SpeakersController {
    private readonly speakersService;
    constructor(speakersService: SpeakersService);
    findAll(): Promise<import("./speaker.entity").Speaker[]>;
    findOne(id: number): Promise<import("./speaker.entity").Speaker>;
    create(dto: CreateSpeakerDto): Promise<import("./speaker.entity").Speaker>;
    update(id: number, dto: UpdateSpeakerDto): Promise<import("./speaker.entity").Speaker>;
    remove(id: number): Promise<import("./speaker.entity").Speaker>;
}
