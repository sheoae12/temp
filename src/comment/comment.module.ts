import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../entities/comment.entity';
import { Board } from '../entities/board.entity';
import { User } from 'src/entities/user.entity';
import { Reply } from 'src/entities/reply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Board, User, Reply])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
