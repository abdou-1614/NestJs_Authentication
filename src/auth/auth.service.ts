import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user';
import {hash} from 'bcrypt'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Tokens } from './types/token.types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
        ) {}

        async getTokens(payload: {sub: string, email: string}): Promise<Tokens>{
            const [at, rt] = await Promise.all([
                this.jwt.signAsync(payload, {
                    expiresIn: 60 * 15,
                    secret: this.config.get('SECRET')
                }),
                this.jwt.signAsync(payload, {
                    expiresIn: 60 * 60 * 24 * 7,
                    secret: this.config.get('SECRET')  
                })
            ])
            return {
                access_token: at,
                refresh_token: rt
            }
        }

    async signup(input: CreateUserDto) {
        const hashed = await hash(input.password, 12)
        try{
            const user = await this.prisma.user.create({
                data: {
                    email: input.email,
                    hash: hashed
                }
            })
            const payload = {sub: user.id, email: user.email}
           const tokens = await this.getTokens(payload)
           return tokens
        }catch(e) {
            if(e instanceof PrismaClientKnownRequestError) {
                if(e.code === 'P2002') {
                    throw new ForbiddenException('Email Already Taken')
                }
            }
        }
    }

    async login() {}

    async logout() {}

    async refreshtoken() {}
}
