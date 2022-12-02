import { Optional } from "@nestjs/common";
import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";

@Schema({
    timestamps: true,
})

export class Category {

    @Prop({ required: true, unique: true })
    name: string;

    @Optional()
    image: string;
}

export type AdminDocument = Category & Document;

export const CATEGORY_MODEL = Category.name;

export const CategorySchema = SchemaFactory.createForClass(Category);