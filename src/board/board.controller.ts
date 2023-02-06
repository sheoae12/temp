import { Controller, Get, Param, ParseIntPipe, Post, Delete, Patch, Body, UsePipes, Req, UseGuards, Query, Header, Headers } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Board } from '../entities/board.entity';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('board')
export class BoardController {
    constructor(
        private boardService: BoardService
    ) {}

    @Get()
    getAllBoards() {
        return this.boardService.getAllBoards();
    }

    @Get('/:id')
    getBoardById(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.boardService.getBoardById(id);
    }

    @Get('/search/:query')
    searchBoard(
        @Param('query') query: string
    ) {
        return this.boardService.searchBoard(query);
    }

   
    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Headers() header: any,
        @Body() createBoardDto: CreateBoardDto,
    ) {
        return this.boardService.createBoard(header, createBoardDto);
    }

    @Delete('/:id')
    deleteBoard(
        @Param('id', ParseIntPipe) id: number
    ): Promise<void> {
        return this.boardService.deleteBoard(id);
    }

    @Patch('/update/:id')
    @UsePipes(ValidationPipe)
    updateBoard(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateBoardDto: UpdateBoardDto
    ) {
        return this.boardService.updateBoard(id, updateBoardDto);
    }
}
