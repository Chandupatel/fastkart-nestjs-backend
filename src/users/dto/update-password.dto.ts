import { Type } from "class-transformer";
import { IsNotEmpty, IsString, Matches, MaxLength } from "class-validator";

export class UpdatePasswordDto {

    @IsString({ message: 'The old password must be a string.' })
    @IsNotEmpty({ message: 'The old password field is required.' })
    @MaxLength(255)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'The password must contain uppercase lowercase numbers and special characters' })
    old_password: string;

    @IsString({ message: 'The new password must be a string.' })
    @IsNotEmpty({ message: 'The new password field is required.' })
    @MaxLength(255)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'The password must contain uppercase lowercase numbers and special characters' })
    new_password: string;

}