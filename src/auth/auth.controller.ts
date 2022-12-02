
import { Controller, Get, Post, Body, UsePipes, ValidationPipe, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalStrategy } from './local.strategy';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private jwtService: JwtService
    ) { }

    @Post('/register')
    @UsePipes(ValidationPipe)
    register(@Body() request: RegisterDto) {
        return this.authService.register(request);
    }


    //@UseGuards(LocalStrategy)
    @Post('login')
    @UsePipes(ValidationPipe)
    async login(@Body() request: LoginDto) {
        const user = await this.authService.validateUser(request.email, request.password);
        if (user) {
            return {
                access_token: this.jwtService.sign({ 'auth_type': 'users', id: user.id, name: user.name, email: user.email, mobile: user.mobile, status: user.status }),
                user: user,
                status: true
            };
        } else {
            return {
                status: false, data: [], message: 'something went wrong please try again after sometime.'
            };
        }
    }

    @Post('admin-login')
    @UsePipes(ValidationPipe)
    async adminLogin(@Body() request: LoginDto) {
        const user = await this.authService.adminLoginValidate(request.email, request.password);
        if (user) {
            return {
                access_token: this.jwtService.sign({ 'auth_type': 'admin', id: user.id, name: user.name, email: user.email, mobile: user.mobile, status: user.status }),
                user: user,
                status: true
            };
        } else {
            return {
                status: false, data: [], message: 'something went wrong please try again after sometime.'
            };
        }


    }



}