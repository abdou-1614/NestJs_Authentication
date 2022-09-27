import { IS_PUBLIC } from './../decorators/public.decorator';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector){
        super()
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC, [
            context.getHandler(),
            context.getClass()
        ])

        if(isPublic) {
            return true
        }
        return super.canActivate(context)
    }
}