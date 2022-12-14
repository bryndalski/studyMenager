import { ApiProperty } from '@nestjs/swagger';

export class ConflictRegisterLocal {
    @ApiProperty({
        description: 'server code',
        example: 409,
    })
    statusCode: number;

    @ApiProperty({
        description: 'Human readable error',
        example: 'User with this mail already exists',
    })
    message: string;

    @ApiProperty({
        description: 'Error type',
        example: 'Conflict',
    })
    error: string;
}
