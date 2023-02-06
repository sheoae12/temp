import { Controller, Get, Post, Delete, Query, Body, Param, ParseIntPipe, UsePipes, Headers } from '@nestjs/common';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './comment.service';
import { brotliDecompressSync } from 'zlib';
import { ValidationPipe } from '@nestjs/common/pipes';

@Controller('comment')
export class CommentController {
    constructor(
        private commentService: CommentService
    ) {}

    @Get()
    getAllComments(
        @Query('board') boardId: number,
    ) {
        return this.commentService.getAllComments(boardId);
    }

    @Post('/')
    @UsePipes(ValidationPipe)
    createComment(
        @Headers() header: any,
        @Query('board') boardId: number,
        @Body() createCommentDto: CreateCommentDto
    ) {
        return this.commentService.createComment(header, boardId, createCommentDto);
    }

    @Get('/:id')
    getCommentByID(
        @Param('id') commentId: number,
    ) {
        return this.commentService.getCommentById(commentId);
    }

    @Delete('/:id')
    deleteComment(@Param('id', ParseIntPipe) commentId: number) {
        return this.commentService.deleteComment(commentId);
    }

    @Post('/:id/reply')
    createReply(
        @Param('id', ParseIntPipe) commentId: number,
        @Body() createCommentDto: CreateCommentDto
    ) {
        return this.commentService.createReply(commentId, createCommentDto);
    }
}
