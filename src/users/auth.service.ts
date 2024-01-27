import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { CreateUserDto } from "./dtos/create-user.dto";
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {}

    async signUp(body: CreateUserDto) {
        const { email, password } = body;
      
        // Check if email already exists
        const existingUser = await this.userService.abc(email);
        console.log(existingUser);
        if (existingUser !== null) {
          throw new BadRequestException('Email already registered');
        }
      
        // Generate salt
        const salt = randomBytes(8).toString('hex');
      
        // Hash the password and the salt together
        const hash = (await scrypt(password, salt, 32)) as Buffer;
      
        // Combine hashed password with salt
        const result = salt + '.' + hash.toString('hex');
      
        // Create user and save it
        const user = await this.userService.create(email, result);
      
        // Then return this user
        return user;
      }

    signIn() {

    }
}