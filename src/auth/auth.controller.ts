import { RtGuards } from './common/guards/rt.guard';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './common/decorators/current-user.decorator';
import { Public } from './common/decorators/public.decorator';
import { CreateUserDto } from './dto/create-user';
import { LoginDto } from './dto/login-user';
import { Tokens } from './types/token.types';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('signup')
    async createUser(@Body() input: CreateUserDto): Promise<Tokens> {
        return this.authService.signup(input)
    }
    @Public()
    @Post('signin')
    async loginUser(@Body() input: LoginDto): Promise<Tokens> {
        return this.authService.login(input)
    }
    @Post('logout')
    async logout(@CurrentUser() userId: string) {
        return this.authService.logout(userId)
    }
    @Public()
    @UseGuards(RtGuards)
    @Post('refresh-token')
    async refreshToken(@CurrentUser('userId') userId: string, @CurrentUser('rt') rt: string) {
        
        return this.authService.refreshtoken(userId, rt)
    }
}
