import { Controller, Get, Post, Body, UsePipes, ValidationPipe, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CategoryService } from './category.service';

@UseGuards(JwtAuthGuard, new AuthGuard('admin'))
@Controller()
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) { }
    @Get('index')
    getProfile(@Request() user) {

        return {
            route_nm: "category Index"
        };
    }

}