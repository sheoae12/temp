import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { Board } from './board.entity';
import { User } from 'src/entities/user.entity';
import { OneToMany } from 'typeorm';
import { Reply } from './reply.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column({ type:'varchar', name: 'contents', length: 50 })
    contents: string;

    @JoinColumn()
    @ManyToOne(type => Board, board => board.comments, {
        onDelete: 'CASCADE'
    })
    board: Board;

    @JoinColumn({
        name: 'username',
        referencedColumnName: 'username'
    })
    @ManyToOne(type => User, user => user.comments, {
        onDelete: 'CASCADE'
    })
    user: User;

    @OneToMany(type => Reply, reply => reply.comment, {
        cascade: true
    } )
    replies: Reply[];
}
