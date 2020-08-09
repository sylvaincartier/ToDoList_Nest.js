import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { TaskEntity } from '@todo/entity/task.entity';
import { UserEntity } from 'src/users/entity/user.entity';

@Entity('todo')
export class TodoEntity {
    @PrimaryGeneratedColumn('uuid') id: string;
    @Column({type: 'varchar', nullable: false }) name: string;
    @Column({ type: 'text', nullable: true }) description?: string;
    @CreateDateColumn() createOn?: Date;
    @CreateDateColumn() updateOn?: Date;

    @ManyToOne(type => UserEntity) owner?: UserEntity;
    @ManyToOne(type => TaskEntity, task => task.todo) tasks?: TaskEntity[]
}