import { Body, Controller, Post, ClassSerializerInterceptor, UseInterceptors, Get, Patch, Param, Query, Delete } from '@nestjs/common';
import { FindAllUserDto, CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
        ) {}
    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        console.log('🚀🚀🚀',body);
        // return this.authService.signUp(body);
        return this.authService.signUp(body);
    }

    @Get('/:id')
    findUser(@Param('id') id: string) {
        return this.userService.findOne(parseInt(id));
    }

    @Get()
    find(@Query('email') email: string) {
        return this.userService.abc(email);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string) {
        return this.userService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id:string, @Body() body: UpdateUserDto){
        return this.userService.update(parseInt(id),body);
    }


    // @Get()
    // findAllUser(@Query('email') email:string) {
    //     return this.userService.findALL(email);
    // }
}
