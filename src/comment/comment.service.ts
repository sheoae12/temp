import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { Board } from '../entities/board.entity';
import { CreateBoardDto } from './../board/dto/create-board.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from 'src/entities/user.entity';
import { Reply } from '../entities/reply.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
        @InjectRepository(Board)
        private boardRepository: Repository<Board>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Reply)
        private replyRepository: Repository<Reply>
    ) {}

    async createComment(header: any, boardId: number, createCommentDto: CreateCommentDto) {
        const { contents } = createCommentDto;

        const board = await this.boardRepository.findOneBy({id: boardId});
        const user = await this.userRepository.findOneBy({ username: header.username });

        if (!board) throw new NotFoundException(`해당 게시글 없음`);
        if (!user) throw new NotFoundException(`해당 유저 없음`);

        await this.commentRepository
            .createQueryBuilder()
            .insert()
            .values({
                contents: contents,
                board: board,
                user: user
            })
            .execute();
    }

    async getCommentById(commentId: number) {
        const found = await this.commentRepository
                .createQueryBuilder("comment")
                .leftJoinAndSelect("comment.board", "board")
                .where("comment.id = :id", { id: commentId })
                .getOne();

        if (found) {
            console.log(found);
            return found;
        }
        else {
            throw new NotFoundException(`해당 댓글 없음`); 
        }
    }

    async getAllComments(boardId: number) {
        const board = await this.boardRepository.findOneBy({id: boardId});

        return await this.commentRepository
                .createQueryBuilder("comment")
                .leftJoinAndSelect("comment.board", "board")
                .where("boardId = :board", { board: board.id })
                .getMany();  
    }

    async deleteComment(commentId: number) {
        await this.getCommentById(commentId);

        await this.commentRepository
            .createQueryBuilder()
            .delete()
            .where("id = :id", { id: commentId })
            .execute();
    }

    async updateComment(commentId: number, createCommentDto: CreateCommentDto) {
        const { contents } = createCommentDto
        await this.getCommentById(commentId);

        return await this.commentRepository
            .createQueryBuilder()
            .update()
            .where("id = :id", { id: commentId })
            .set({
                contents: contents
            })
            .execute();
    }

    async createReply(commentId: number, createCommentDto: CreateCommentDto) {
        const { contents } = createCommentDto;

        await this.getCommentById(commentId);

        return await this.replyRepository
            .createQueryBuilder()
            .insert()
            .values({
                commentId: commentId,
                contents: contents
            })
            .execute();
    }
}
