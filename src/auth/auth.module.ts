import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from "./local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";

export const jwtConstants = {
    secret: 'secretKey',
};

@Module({
    imports: [PassportModule, JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '43200s' },
    })],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy,JwtStrategy],
    exports: [AuthService],
})

export class AuthModule { }