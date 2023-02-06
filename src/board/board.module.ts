import { Module, UseGuards } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Board } from '../entities/board.entity'
import { Comment } from '../entities/comment.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Comment, User])],
  controllers: [BoardController],
  providers: [BoardService]
})
export class BoardModule {}
