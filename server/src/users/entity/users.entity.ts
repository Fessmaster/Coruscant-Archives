import { BasicEntity } from 'src/basic/entity/basic.entity';
import { UserRole } from 'src/common/enums/user-role';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class UsersEntity extends BasicEntity {
  @Column({ type: 'varchar', unique:true, length: 30 })
  login: string;

  @Column({ type: 'varchar'})
  password: string;

  @Column({type: 'varchar', unique: true})
  email: string;

  @Column({type: 'enum', enum: UserRole})
  role: string;

  @Column({type: 'varchar', nullable: true, name: 'first_name' })
  firstName: string;

  @Column({type: 'varchar', nullable: true, name: 'second_name' })
  secondName: string;
}
