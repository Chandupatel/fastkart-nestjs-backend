import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseOptionsFactory, MongooseModuleOptions } from "@nestjs/mongoose";

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
    constructor(private config: ConfigService) { }

    createMongooseOptions():
        | MongooseModuleOptions
        | Promise<MongooseModuleOptions> {

        const host = this.config.get("DB_HOST");
        const username = this.config.get("DB_USERNAME");
        const password = this.config.get("DB_PASSWORD");
        const port = this.config.get("DB_PORT");
        const db = this.config.get("DB_DATABASE");
        const isLocal = this.config.get("APP_ENV") === "local";
        const uri = isLocal
            ? `mongodb://localhost:${port}/${db}`
            : `mongodb+srv://${username}:${password}@${host}/${db}?retryWrites=true&w=majority`;
        return {
            uri,
        };
    }
}