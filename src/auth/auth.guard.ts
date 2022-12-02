import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    private AuthType: string;
    constructor(auth_type: string) {
        this.AuthType = auth_type;
    }
    canActivate(context: ExecutionContext): boolean {
        const ctx = context.switchToHttp();
        const request: any = ctx.getRequest<Request>();
        
        if (this.AuthType == request.user.auth_type) {
            return true;
        }else {
            throw new UnauthorizedException();
        }
    }
}