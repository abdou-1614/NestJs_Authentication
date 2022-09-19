import { Injectable } from "@nestjs/common";
import {PassportStrategy} from '@nestjs/passport'
import { ExtractJwt, Strategy } from "passport-jwt";
import {ConfigService} from '@nestjs/config'

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('SECRET')
        })
    }

    async validation(payload: any) {
        return payload
    }
}