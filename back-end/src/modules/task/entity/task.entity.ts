import { UsersEntity } from 'src/modules/users/entity/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  title: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'varchar',
  })
  status: string;

  @Column({
    type: 'date',
  })
  dateEnd: Date;

  @ManyToOne(() => UsersEntity, (user) => user.id, {
    createForeignKeyConstraints: true,
  })
  user: UsersEntity;
}
