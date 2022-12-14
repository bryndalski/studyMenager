import { applyDecorators } from '@nestjs/common';
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiDefaultResponse,
    ApiExtraModels,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse,
    getSchemaPath,
} from '@nestjs/swagger';
import { LoginLocalUserDTO } from '../../../auth-service/src/common/DTO/LoginLocalUser.dto';

interface ISingleReposnse {
    description: string;
    schema: any;
}

interface ISwaggerPost {
    apiTag: string;
    description: string;
    okResponse?: ISingleReposnse;
    createdResponse?: ISingleReposnse;
    serverError?: ISingleReposnse;
    forbidden?: ISingleReposnse;
    conflict?: ISingleReposnse;
    notExists?: ISingleReposnse;
    unaothorized?: ISingleReposnse;
}

const returnDecorator = ({
    description,
    schema,
}: ISingleReposnse): ISingleReposnse => {
    const decorator = {
        description,
        schema: {
            $ref: getSchemaPath(schema),
        },
    } as ISingleReposnse;
    return decorator;
};

export const SwaggerPost = (props: ISwaggerPost) => {
    const combinedDecorators = [
        ApiDefaultResponse({ description: props.description }),
        ApiTags(props.apiTag),
    ];
    Object.keys(props).forEach((element: string) => {
        switch (element) {
            case 'okResponse':
                combinedDecorators.push(
                    ApiOkResponse({
                        ...returnDecorator(props[element]),
                    }),

                    ApiExtraModels(props[element].schema)
                );
                break;
            case 'createdResponse':
                combinedDecorators.push(
                    ApiCreatedResponse(returnDecorator(props[element])),

                    ApiExtraModels(props[element].schema)
                );
                break;
            case 'serverError':
                combinedDecorators.push(
                    ApiInternalServerErrorResponse(
                        returnDecorator(props[element])
                    ),

                    ApiExtraModels(props[element].schema)
                );
                break;
            case 'forbidden':
                combinedDecorators.push(
                    ApiForbiddenResponse(returnDecorator(props[element])),
                    ApiExtraModels(props[element].schema)
                );
                break;
            case 'notExists':
                combinedDecorators.push(
                    ApiNotFoundResponse(returnDecorator(props[element])),

                    ApiExtraModels(props[element].schema)
                );
                break;
            case 'conflict':
                combinedDecorators.push(
                    ApiConflictResponse(returnDecorator(props[element])),

                    ApiExtraModels(props[element].schema)
                );
                break;
            case 'unauthorized':
                combinedDecorators.push(
                    ApiUnauthorizedResponse(returnDecorator(props[element])),

                    ApiExtraModels(props[element].schema)
                );
                break;
        }
    });
    return applyDecorators(...combinedDecorators);
};
