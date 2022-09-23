import { Injectable } from "@nestjs/common";
import {PassportStrategy} from '@nestjs/passport'
import { ExtractJwt, Strategy } from "passport-jwt";
import {ConfigService} from '@nestjs/config'
import { AccessTokenPayload } from "./types/tokenPayload.types";

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('SECRET')
        })
    }

    async validation(payload: AccessTokenPayload) {
        return {
            userId: payload.sub,
            email: payload.email
        }
    }
}