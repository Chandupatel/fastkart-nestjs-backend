import { Controller, Get, Post, Body, UsePipes, ValidationPipe, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HomeService } from './home.service';

@UseGuards(JwtAuthGuard, new AuthGuard('admin'))
@Controller()
export class HomeController {
    constructor(
        private readonly homeService: HomeService
    ) { }
    @Get('dashboard')
    getProfile(@Request() user) {
        let user_data = user.user;
        return user_data;
    }

}