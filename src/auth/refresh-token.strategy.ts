import { PassportStrategy } from '@nestjs/passport';
import {Injectable} from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'rt-jwt') {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('SECRET'),
            passReqToCallback: true
        })
    }
    async validation(req: Request, payload: any) {
        const refreshToken = req.get('authorization').replace('Bearer', '').trim()
        return {
            ...payload,
            refreshToken
        }
    }
}