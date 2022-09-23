import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user';
import { LoginDto } from './dto/login-user';
import { Tokens } from './types/token.types';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    async createUser(@Body() input: CreateUserDto): Promise<Tokens> {
        return this.authService.signup(input)
    }
    @Post('signin')
    async loginUser(@Body() input: LoginDto): Promise<Tokens> {
        return this.authService.login(input)
    }
    // @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    async logout(@Req() request: Request) {
        const {userId} = request.user as {userId: string}
        return this.authService.logout(userId)
    }
    // @UseGuards(AuthGuard('rt-jwt'))
    @Post('refresh-token')
    async refreshToken(@Req() request: Request) {
        const user = request.user

        
        return this.authService.refreshtoken(user['sub'], user['rt'])
    }
}
