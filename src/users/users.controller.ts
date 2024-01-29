import { Body, Controller, Post, ClassSerializerInterceptor, UseInterceptors, Get, Patch, Param, Query, Delete, Session } from '@nestjs/common';
import { FindAllUserDto, CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { CurrentUserInterceptor } from './interceptor/current-user.interceptor';


@Controller('auth')
@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
        ) {}
    
    @Get('/whoami')
    whoami(@CurrentUser() user: User) {
        return user;
    }    

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        console.log('🚀🚀🚀',body);
        // return this.authService.signUp(body);
        const user = await this.authService.signUp(body);
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    async signIn(@Body() body: CreateUserDto, @Session() session: any) {
        console.log('🚀🚀🚀',body);
        // return this.authService.signUp(body);
        const user = await this.authService.signIn(body.email,body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signout')
    async signOut(@Session() session : any){
        session.userId = null;
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
