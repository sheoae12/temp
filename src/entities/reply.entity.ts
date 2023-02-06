import { JoinColumn, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Comment } from "./comment.entity";
import { User } from "./user.entity";

@Entity()
export class Reply {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    commentId: number;

    @Column()
    contents: string;

    @JoinColumn()
    @ManyToOne(type => Comment, comment => comment.replies, {
        onDelete: 'CASCADE'
    })
    comment: Comment;

    @JoinColumn({
        name: 'username',
        referencedColumnName: 'username'
    })
    @ManyToOne(type => User, user => user.replies, {
        onDelete: 'CASCADE'
    })
    user: User;
}