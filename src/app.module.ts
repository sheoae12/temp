import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './board/board.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { Board } from './entities/board.entity';
import { User } from './entities/user.entity';
import { Comment } from './entities/comment.entity';
import { Reply } from './entities/reply.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }), 
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port: 3306,
      username: 'mysql',
      password: 'root',
      database: 'board-service',
      entities:[Board, User, Comment, Reply],
      synchronize : false,
      autoLoadEntities:true,
      charset:'utf8mb4',
      logging:true, 
      keepConnectionAlive:true,
    }),
    BoardModule,
    AuthModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{}
