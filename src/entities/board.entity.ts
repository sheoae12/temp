import { User } from "./user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Comment } from "./comment.entity";

@Entity()
export class Board {
    @PrimaryGeneratedColumn({ type:'int', name:'id'})
    id: number;

    @Column({ type: 'varchar', name:'title', length:30 })
    title: string;

    @Column({ type: 'varchar', name:'contents', length:100})
    contents: string;

    @Column({ type: 'varchar', name:'date', length: 12})
    date: string;

    @JoinColumn({
        name: 'username',
        referencedColumnName: 'username'
    })
    @ManyToOne(type => User, user => user.boards, {
        onDelete: 'CASCADE'
    })
    user: User;

    @OneToMany(type => Comment, comment => comment.board, { 
        cascade: true
    })
    comments: Comment[];

    
}