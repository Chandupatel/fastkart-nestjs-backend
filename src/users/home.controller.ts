import { Controller, Get, Post, Body, UsePipes, ValidationPipe, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { HomeService } from './home.service';

@UseGuards(JwtAuthGuard, new AuthGuard('users'))
@Controller()
export class HomeController {
    constructor(
        private readonly homeService: HomeService
    ) { }
    @Get('get-profile')
    getProfile(@Request() user) {
        let user_data = user.user;
        return user_data;
    }

    @Post('update-profile')
    @UsePipes(ValidationPipe)
    updateProfile(@Request() user, @Body() request: UpdateProfileDto) {
        let user_data = user.user;
        console.log(user_data);
        return this.homeService.updateProfile(user_data.id, request)
    }

    @Post('update-pasword')
    @UsePipes(ValidationPipe)
    updatePassword(@Request() user, @Body() request: UpdatePasswordDto) {
        let user_data = user.user;
        return this.homeService.updatePassword(user_data.id, request)
    }
}