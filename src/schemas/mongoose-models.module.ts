import { Module, Global } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminSchema, ADMIN_MODEL } from "./admin.schema";
import { BannerSchema, BANNER_MODEL } from "./banner.schema";
import { CategorySchema, CATEGORY_MODEL } from "./categoty.schema";
import { SubCategorySchema, SUB_CATEGORY_MODEL } from "./sub-categoty.schema";
import { UserSchema, USER_MODEL } from "./user.schema";

const MODELS = [
    { name: USER_MODEL, schema: UserSchema },
    { name: ADMIN_MODEL, schema: AdminSchema },
    { name: BANNER_MODEL, schema: BannerSchema },
    { name: CATEGORY_MODEL, schema: CategorySchema },
    { name: SUB_CATEGORY_MODEL, schema: SubCategorySchema },
];

@Global()
@Module({
    imports: [MongooseModule.forFeature(MODELS)],
    exports: [MongooseModule],
})
export class MongooseModelsModule { }