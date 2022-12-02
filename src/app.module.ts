import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { MongooseModelsModule } from './schemas/mongoose-models.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        AppRoutingModule,
        ConfigModule.forRoot({ cache: true, expandVariables: true, isGlobal: true }),
        DatabaseModule,
        MongooseModelsModule,
        AuthModule,
        AdminModule,
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
