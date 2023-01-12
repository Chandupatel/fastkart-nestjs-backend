import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength } from "class-validator";

export class RegisterDto {

    @IsString({ message: 'The name must be a string.' })
    @IsNotEmpty({ message: 'The name field is required.' })
    @MaxLength(255)
    name: string;

    @IsNotEmpty({ message: 'The email field is required.' })
    @IsEmail({ message: 'The email must be a valid email address.' })
    @MaxLength(255)
    email: string;

    @IsString({ message: 'The mobile must be a string.' })
    @IsNotEmpty({ message: 'The mobile field is required.' })
    @IsNotEmpty()
    mobile: string; 
    
    @IsString({ message: 'The password must be a string.' })
    @IsNotEmpty({ message: 'The password field is required.' })
    @MaxLength(255)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'The password must contain uppercase lowercase numbers and special characters' })
    password: string;
}