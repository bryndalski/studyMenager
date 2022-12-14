import { ApiProperty } from '@nestjs/swagger';

export class SuccessLoginLocal {
    @ApiProperty({
        description: 'User JWT access token',
    })
    accessToken: string;
}

export class ErrorLoginLocal {
    @ApiProperty({
        description: 'server error code',
        example: 'LOG01',
    })
    code: string;

    @ApiProperty({
        description: 'Human readable error',
        example: 'Could not find matching user',
    })
    message: string;
}
