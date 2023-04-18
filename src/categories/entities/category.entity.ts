import { BaseEntity } from '@src/database/helpers/base-entity';
import { Phrase } from '@src/phrases/entities/phrase.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('categories')
export class Category extends BaseEntity {
  @Column({ type: 'varchar', length: 30 })
  name: string;

  @OneToMany(() => Phrase, (phrase) => phrase.category)
  phrases: Phrase[];

  @Column({ type: 'varchar', length: 30 })
  alias: string;
}
