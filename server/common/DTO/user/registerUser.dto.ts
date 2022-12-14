import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDTO {
    @IsEmail()
    @ApiProperty({
        description: 'email provided by user',
        example: 'kowalski@mail.com',
    })
    email: string;

    @ApiProperty()
    @MinLength(7)
    password: string;

    @ApiProperty()
    @IsString()
    @ApiProperty({
        description: 'first name provided by user',
        example: 'Adam ',
        default: 'Adam',
    })
    @MaxLength(20)
    firstName: string;

    @ApiProperty()
    @IsString()
    @ApiProperty({
        description: 'last name provided by user',
        example: 'Kowalski',
        default: 'Kowalski',
        maxLength: 100,
    })
    @MaxLength(100)
    lastName: string;

    @ApiProperty()
    @IsString()
    @ApiProperty({
        description: 'nikcname visible to other users',
        example: 'GigaChadKowalski',
        maxLength: 150,
    })
    @MaxLength(150)
    nickname: string;
}
