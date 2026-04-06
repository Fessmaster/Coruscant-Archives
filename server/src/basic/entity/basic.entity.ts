import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BasicEntity {
  @PrimaryGeneratedColumn()
  id: number;  

  @DeleteDateColumn({ name: 'delete_at', nullable: true })
  deleteAt: Date;

  @CreateDateColumn({name: 'create_date'})
  createDate: Date;

  @UpdateDateColumn({name: 'update_date'})
  updateDate: Date;
}
