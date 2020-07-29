import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('todo')
export class TodoEntity {
    @PrimaryGeneratedColumn('uuid') id: string;
    @Column({type: 'varchar', nullable: false }) name: string;
    @Column({ type: 'text', nullable: true }) description?: string;
    @CreateDateColumn() createOn?: Date;
    @CreateDateColumn() updateOn?: Date;
}