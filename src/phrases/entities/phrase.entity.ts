import { Category } from '@src/categories/entities/category.entity';
import { BaseEntity } from '@src/database/helpers/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('phrases')
export class Phrase extends BaseEntity {
  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 100 })
  phraseMaster: string;

  @Column({ type: 'varchar', length: 32 })
  phraseHash: string;

  @ManyToOne(() => Category, (category) => category.phrases)
  @JoinColumn()
  category: Category;

  @Column({ type: 'uuid' })
  categoryId: string;
}
