import { Optional } from "@nestjs/common";
import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";

@Schema({
    timestamps: true,
})

export class Banner {

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    short_descripption: string;

    @Prop({ required: true })
    button_coller: string;

    @Prop({ required: true })
    button_text: string;

    @Prop({ required: true })
    link: string;

    @Optional()
    image: string;
}

export type AdminDocument = Banner & Document;

export const BANNER_MODEL = Banner.name;

export const BannerSchema = SchemaFactory.createForClass(Banner);