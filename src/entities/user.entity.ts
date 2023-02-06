import { Comment } from "src/entities/comment.entity";
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import { Board } from './board.entity';
import { Reply } from "./reply.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: 'int'})
    uid: number;

    @Column({ type: 'varchar', length: 10, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 100 })
    password: string;

    @OneToMany(type => Board, board => board.user, {
        cascade: true
    })
    boards: Board[];

    @OneToMany(type => Comment, comment => comment.user, {
        cascade: true
    })
    comments: Comment[]

    @OneToMany(type => Reply, reply => reply.user, {
        cascade: true
    })
    replies: Reply[];
}