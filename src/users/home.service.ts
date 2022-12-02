import { BadRequestException, Injectable, ServiceUnavailableException, } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { hash } from "bcrypt";
import { Model } from "mongoose";
import { UserDocument, USER_MODEL } from "src/schemas/user.schema";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Injectable()
export class HomeService {
    constructor(
        @InjectModel(USER_MODEL) private readonly userModel: Model<UserDocument>
    ) { }

    async updateProfile(_id: string, updateProfileDto: UpdateProfileDto): Promise<any> {
        try {
            const user = await this.userModel.findByIdAndUpdate<UserDocument>(_id, updateProfileDto);
            if (user) {
                return {
                    status: true, data: [], message: 'Profile Update  Successfully.'
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

    async updatePassword(_id: string, updateProfileDto: UpdatePasswordDto): Promise<any> {
        try {
            const user = await this.userModel.findOne<UserDocument>({ _id });
            if (user) {
                const isPwdMatched = await user.isValidPassword(updateProfileDto.old_password);
                if (isPwdMatched) {
                    const new_password = await hash(updateProfileDto.new_password,10);
                    const update_pass = await this.userModel.findByIdAndUpdate<UserDocument>(_id, { password: new_password });
                    if (update_pass) {
                        return {
                            status: true, data: [], message: 'Password Update Successfully.'
                        };
                    } else {
                        return {
                            status: false, data: [], message: 'something went wrong please try again after sometime.'
                        };
                    }
                } else {
                    return {
                        status: true, data: [], message: 'Old  Password Dose  note Metch.'
                    };
                }
            } else {
                return {
                    status: false, data: [], message: 'something went wrong please try again after sometime.'
                };
            }
        } catch (error) {
            return {
                status: false, errors: error, message: ''
            };
        }
    }
}