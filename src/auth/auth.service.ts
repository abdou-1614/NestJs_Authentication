import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user';
import {hash} from 'bcrypt'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Tokens } from './types/token.types';
@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async signup(input: CreateUserDto) {
        const hashed = await hash(input.password, 12)
        try{
            const user = await this.prisma.user.create({
                data: {
                    email: input.email,
                    hash: hashed
                }
            })
            return user
            // console.log({user})
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
