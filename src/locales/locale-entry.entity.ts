import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('locale_entries')
@Unique(['locale', 'key'])
export class LocaleEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  locale: string;

  @Column()
  key: string;

  @Column('text')
  value: string;
}
