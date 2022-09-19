import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user';
import { Tokens } from './types/token.types';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    async createUser(@Body() input: CreateUserDto) {
        return this.authService.signup(input)
    }
}
