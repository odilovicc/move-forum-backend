import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('speakers')
export class Speaker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  nameRu: string;

  @Column({ nullable: true })
  nameUz: string;

  @Column()
  nameEn: string;

  @Column({ default: '' })
  photo: string;

  @Column()
  position: string;

  @Column({ nullable: true })
  positionRu: string;

  @Column({ nullable: true })
  positionUz: string;

  @Column({ nullable: true })
  positionEn: string;

  @Column('text')
  bio: string;

  @Column('text', { nullable: true })
  bioRu: string;

  @Column('text', { nullable: true })
  bioUz: string;

  @Column('text', { nullable: true })
  bioEn: string;

  @Column({ default: 0 })
  order: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
