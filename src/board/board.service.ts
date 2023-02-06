import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Board } from '../entities/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { Repository } from 'typeorm';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Comment } from 'src/entities/comment.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private boardRepository: Repository<Board>,
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async getAllBoards() {
        return await this.boardRepository
            .createQueryBuilder('board')
            .leftJoinAndSelect('board.comments', 'comment')
            .getMany();
    }

    async getBoardById(id: number) {        
        const found = await this.boardRepository
            .createQueryBuilder('board')
            .leftJoinAndSelect('board.comments', 'comment')
            .where('board.id = :id', { id: id })
            .getOne();

        if (!found) throw new NotFoundException(`해당 게시글 없음`);

        return found;
    }

    async searchBoard(query: string) {
        return await this.boardRepository
            .createQueryBuilder("board")
            .select()
            .where('board.title LIKE :searchQuery', {searchQuery: `%${query}%`})
            .orWhere('board.contents LIKE :searchQuery', {searchQuery: `%${query}%`})
            .getMany();
    }

    async createBoard(header: any, createBoardDto: CreateBoardDto) {
        const { title, contents, date } = createBoardDto;

        const user = await this.userRepository.findOneBy({ username: header.username });

        if (!user) throw new NotFoundException(`해당 유저 없음`);

        return await this.boardRepository
            .createQueryBuilder()
            .insert()
            .values({
                title: title,
                contents: contents,
                date: date,
                user: user
            })
            .execute();
    }

    async deleteBoard(id: number) {
        await this.getBoardById(id);
        
        await this.boardRepository
            .createQueryBuilder()
            .delete()
            .where("id = :id", { id: id })
            .execute();
    }

    async updateBoard(id: number, updateBoardDto: UpdateBoardDto) {
        const { title, contents } = updateBoardDto;

        await this.getBoardById(id);

        //사용자확인기능없음

        return await this.boardRepository
            .createQueryBuilder()
            .update()
            .where("id = :id", { id: id })
            .set({
                title: title,
                contents: contents
            })
            .execute();
    }

}
