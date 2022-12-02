import { BadRequestException, Injectable, ServiceUnavailableException, } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AdminDocument, ADMIN_MODEL } from "src/schemas/admin.schema";
import { UserDocument, USER_MODEL } from "src/schemas/user.schema";
import { RegisterDto } from "./dto/register.dto";


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(USER_MODEL) private readonly userModel: Model<UserDocument>,
        @InjectModel(ADMIN_MODEL) private readonly adminModel: Model<AdminDocument>
    ) {

    }
    async register(registerdto: RegisterDto) {
        try {
            const createdUser = await this.userModel.create(registerdto);
            if (createdUser) {
                return {
                    status: true, data: createdUser, message: ''
                };
            } else {
                return {
                    status: false, data: [], message: 'something went wrong please try again after sometime.'
                };
            }
        } catch (error) {
            if (error.name === "ValidationError") {
                return {
                    status: false, errors: error.errors, message: ''
                };
            }
            if (error.code == 11000) {
                let message = Object.keys(error.keyValue)[0] + ' already exist';
                return {
                    status: false, message: message
                };
            }
            return {
                status: false, errors: error, message: ''
            };
        }
    }

    async validateUser(email: string, password: string): Promise<any> {

        const user = await this.userModel.findOne<AdminDocument>({ email }, "+password");
        if (user) {
            const isPwdMatched = await user.isValidPassword(password);
            if (isPwdMatched) {
                return user;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
    
    async getUserById(_id: string): Promise<any> {
        const user = await this.userModel.findOne<UserDocument>({ _id });
        if (user) {
            return user;
        } else {
            return null;
        }
    }
    
    async adminLoginValidate(email: string, password: string): Promise<any> {

        const data = await this.adminModel.findOne<UserDocument>({ email });
        if (data) {
            const isPwdMatched = await data.isValidPassword(password);
            if (isPwdMatched) {
                return data;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}