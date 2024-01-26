import { Body, Controller, Post, ClassSerializerInterceptor, UseInterceptors, Get, Patch, Param, Query, Delete } from '@nestjs/common';
import { FindAllUserDto, createUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(private userService: UsersService) {}
    @Post('/signup')
    createUser(@Body() body: createUserDto) {
        console.log('🚀🚀🚀',body);
        this.userService.create(body.email, body.password);
    }

    @Get('/:id')
    findUser(@Param('id') id: string) {
        return this.userService.findOne(parseInt(id));
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    find(@Query('email') email: string) {
        return this.userService.findALL(email);
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
