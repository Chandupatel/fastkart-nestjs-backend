import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { compare, hash } from "bcrypt";

@Schema({
    timestamps: true,
    methods: {
        async isValidPassword(this: AdminDocument, candidatePassword: string) {
            const hashedPassword = this.password;
            const isMatched = await compare(candidatePassword, hashedPassword);
            return isMatched;
        },
    }
})

export class Admin {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, unique: true })
    mobile?: string;
    //select: true 
    @Prop({ required: true})
    password: string;

    @Prop({ default: 0 })
    is_email_verified?: number;
    
    @Prop({ default: null })
    email_verified_at?: Date;
    
    @Prop({ default: null })
    remember_token: string;

    isValidPassword: (candidatePassword: string) => Promise<boolean>;
}

export type AdminDocument = Admin & Document;

export const ADMIN_MODEL = Admin.name; 

export const AdminSchema = SchemaFactory.createForClass(Admin);