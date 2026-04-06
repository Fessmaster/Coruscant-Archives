import { Column, Entity, Index } from 'typeorm';
import { BasicEntity } from './basic.entity';

@Entity()
export class ExtendedEntity extends BasicEntity {
  @Index({ unique: true })
  @Column({ nullable: true, name: 'external_id'})
  external_id: number;

  @Column({ type: 'text', nullable: true })
  about: string;
}
