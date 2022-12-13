import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginLocalUserDTO {
    @IsEmail()
    @ApiProperty({
        description: 'email provided by user',
        example: 'kowalski@mail.com',
    })
    email: string

    @ApiProperty()
    @MinLength(7)
    password: string
}
