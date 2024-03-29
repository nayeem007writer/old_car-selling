import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptor/current-user.interceptor';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [ UsersController ],
  providers: [ UsersService, AuthService, CurrentUserInterceptor ],
})
export class UsersModule {}
