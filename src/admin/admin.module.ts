import { Module } from "@nestjs/common";
import { CategoryModule } from "./categories/category.module";
import { HomeController } from "./home.controller";
import { HomeService } from "./home.service";

@Module({
    imports: [CategoryModule],
    controllers: [HomeController],
    providers: [HomeService],
    exports: [HomeService],
})

export class AdminModule { }