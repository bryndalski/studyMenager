import { applyDecorators } from '@nestjs/common'
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiDefaultResponse,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger'

interface ISwaggerPost {
    apiTag: string
    description: string
    okResponse?: string
    createdResponse?: string
    serverError?: string
    forbidden?: string
    conflict?: string
    notExists?: string
    unaothorized?: string
}

export const SwaggerPost = (props: ISwaggerPost) => {
    const combinedDecorators = [
        ApiDefaultResponse({ description: props.description }),
        ApiTags(props.apiTag),
    ]
    Object.keys(props).forEach((element: string) => {
        switch (element) {
            case 'okResponse':
                combinedDecorators.push(
                    ApiOkResponse({ description: props[element] })
                )
                break
            case 'createdResponse':
                combinedDecorators.push(
                    ApiCreatedResponse({ description: props[element] })
                )
                break
            case 'serverError':
                combinedDecorators.push(
                    ApiInternalServerErrorResponse({
                        description: props[element],
                    })
                )
                break
            case 'forbidden':
                combinedDecorators.push(
                    ApiForbiddenResponse({
                        description: props[element],
                    })
                )
                break
            case 'notExists':
                combinedDecorators.push(
                    ApiNotFoundResponse({
                        description: props[element],
                    })
                )
                break
            case 'conflict':
                combinedDecorators.push(
                    ApiConflictResponse({ description: props[element] })
                )
                break
            case 'unauthorized':
                combinedDecorators.push(
                    ApiUnauthorizedResponse({ description: props[element] })
                )
                break
        }
    })
    return applyDecorators(...combinedDecorators)
}
