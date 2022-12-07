import { applyDecorators } from '@nestjs/common'
import {
    ApiOperation,
    ApiCreatedResponse,
    ApiConflictResponse,
    ApiInternalServerErrorResponse,
} from '@nestjs/swagger/dist'

interface IswaggerPost {
    summary: string
    description: string
    success: string
    conflict: string
    internalServerError: string
}

export function SwaggerPost(props: IswaggerPost) {
    return applyDecorators(
        ApiOperation({
            summary: props.summary,
            description: props.description,
        }),
        ApiCreatedResponse({
            description: `SUCCESS: ${props.success}`,
        }),
        ApiConflictResponse({
            description: `ERROR: ${props.conflict}`,
        }),
        ApiInternalServerErrorResponse({
            description: `ERROR: ${props.internalServerError}`,
        })
    )
}
