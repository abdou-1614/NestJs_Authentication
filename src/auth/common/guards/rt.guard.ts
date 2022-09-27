import { AuthGuard } from "@nestjs/passport";

export class RtGuards extends AuthGuard('rt-jwt'){
    constructor(){
        super()
    }
}