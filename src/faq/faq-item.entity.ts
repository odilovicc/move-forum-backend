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

  @Column({ nullable: true })
  questionRu: string;

  @Column('text', { nullable: true })
  answerRu: string;

  @Column({ nullable: true })
  questionUz: string;

  @Column('text', { nullable: true })
  answerUz: string;

  @Column({ nullable: true })
  questionEn: string;

  @Column('text', { nullable: true })
  answerEn: string;

  @Column({ default: 0 })
  order: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
