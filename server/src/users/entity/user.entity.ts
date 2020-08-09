import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToOne } from "typeorm";
import * as bcrypt from 'bcrypt';


@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid') id: string;
    @Column({ type: 'varchar', nullable: false, unique: true }) username: string;
    @Column({ type: 'varchar', nullable: false }) password: string;
    email: string;
    @BeforeInsert() async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    };
    @ManyToOne(type => UserEntity)owner?: UserEntity;
}