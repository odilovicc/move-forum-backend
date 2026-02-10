import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('faq_items')
export class FaqItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column('text')
  answer: string;

  @Column({ default: 0 })
  order: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
