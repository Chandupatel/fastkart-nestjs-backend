import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { compare, hash } from "bcrypt";
import { RECORD_STATUS } from "src/constants/globle.constants";

@Schema({
    timestamps: true,
    methods: {
        async isValidPassword(this: UserDocument, candidatePassword: string) {
            const hashedPassword = this.password;
            const isMatched = await compare(candidatePassword, hashedPassword);
            return isMatched;
        },
    }
})

export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, unique: true })
    mobile?: string;
    //select: true 
    @Prop({ required: true})
    password: string;

    @Prop({
        type: String,
        enum: Object.keys(RECORD_STATUS),
        default: RECORD_STATUS.INACTIVE,
    })
    status?: RECORD_STATUS;

    @Prop({ default: 0 })
    is_email_verified?: number;

    email_verified_at?: Date;
    
    remember_token: string;
    
    @Prop(
        raw({
            reference: { type: String },
            beta: { type: Boolean },
        })
    )
    description: Record<string, any> | any;

    isValidPassword: (candidatePassword: string) => Promise<boolean>;
}

export type UserDocument = User & Document;

export const USER_MODEL = User.name; 

export const UserSchema = SchemaFactory.createForClass(User);


UserSchema.pre("save", async function (next) {
    const hasd_password = await hash(this.password, 10);
    this.password = hasd_password;
    next();
});