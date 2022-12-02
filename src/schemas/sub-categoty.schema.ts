import { Optional } from "@nestjs/common";
import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Category, CATEGORY_MODEL } from "./categoty.schema";

@Schema({
    timestamps: true,
})

export class SubCategory {

    @Prop({ type: Types.ObjectId, ref: CATEGORY_MODEL, required: true })
    category: Types.ObjectId | Category;

    @Prop({ required: true, unique: true })
    name: string;

    @Optional()
    image: string;
}

export type SubCategoryDocument = SubCategory & Document;

export const SUB_CATEGORY_MODEL = SubCategory.name;

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);