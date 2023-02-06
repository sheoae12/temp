import { Controller, Get, Body, UsePipes, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from '@nestjs/common/pipes';
import { create } from 'domain';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('/signup')
    @UsePipes(ValidationPipe)
    signUp(@Body() createUserDto: CreateUserDto ): Promise<void> {
        return this.authService.signUp(createUserDto);
    }

    @Post('/signin')
    @UsePipes(ValidationPipe)
    signIn(@Body() createUserDto: CreateUserDto): Promise<{accessToken: string}> {
        return this.authService.signIn(createUserDto);
    }
}
