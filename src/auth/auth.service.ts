import { BadRequestException, ConflictException, Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
        private jwtStrategy: JwtStrategy
    ) {}

    async signUp(createUserDto: CreateUserDto): Promise<void> {
        const { username, password } = createUserDto;

        const salt = await bcrypt.genSalt();

        const hashedPassword = await bcrypt.hash(password, salt);

        try {
            await this.userRepository  
                .createQueryBuilder()
                .insert()
                .values({
                    username: username,
                    password: hashedPassword
                })
                .execute();
        } catch(err) {
            if(err.errno === 1062) {
                throw new ConflictException(`${username} is already exist`);
            } else {
                throw new BadRequestException();
            }
        }
    }

    async signIn(createUserDto: CreateUserDto): Promise<{accessToken: string}> {
        const { username, password } = createUserDto;
        const user =  await this.userRepository.findOne({ where: {username: username}});

        if (user && (await bcrypt.compare(password, user.password))) {
            // 유저 토큰 생성 ( Secret + Payload )
            const payload = { username };   //payload에는 중요한 정보는 넣지 않는다
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken };
        } else {
            throw new UnauthorizedException('logIn failed');
        }
    }
}
