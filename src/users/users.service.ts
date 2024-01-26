import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repo: Repository<User>){}
    
    create(email:string, password:string) {
        console.log(password);
        const user = this.repo.create({ email, password});
        return this.repo.save(user);
    }
    findOne(id: number) {
        console.log(id);
        return this.repo.findOne({ where: { id } });
    }
    async findALL(email: string) {
        return  await this.repo.find({where:{email}});
    }
    async update(id: number, attrs: Partial<User>) {
        const user = await this.repo.findOne({where: {id}});

        if(!user){
            throw new NotFoundException("invalid credential");

        }
        Object.assign(user,attrs);
        return this.repo.save(user);
    }

    async remove( id: number) {
        const user = await this.repo.find({where:{id}});
        if(!user){
            throw new NotFoundException("invalid credential");
        }
        return this.repo.remove(user);
    }

}
