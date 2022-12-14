import { applyDecorators } from '@nestjs/common';
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiExtraModels,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiUnauthorizedResponse,
    getSchemaPath,
} from '@nestjs/swagger';

interface ISingleReposnse {
    description: string;
    schema?: any;
}

interface ISwaggerPost {
    description: string;
    summary: string;
    okResponse?: ISingleReposnse;
    createdResponse?: ISingleReposnse;
    serverError?: ISingleReposnse;
    forbidden?: ISingleReposnse;
    conflict?: ISingleReposnse;
    notExists?: ISingleReposnse;
    unaothorized?: ISingleReposnse;
}

const returnDecorator = ({ description, schema }: ISingleReposnse) => {
    let decorator = {
        description,
    } as any;

    if (schema) {
        decorator = {
            ...decorator,
            schema: {
                $ref: getSchemaPath(schema),
            },
        };
    }
    return decorator;
};

export const SwaggerPost = (props: ISwaggerPost) => {
    const combinedDecorators = [
        ApiOperation({
            description: props.description,
            summary: props.summary,
        }),
    ];
    Object.keys(props).forEach((element: string) => {
        switch (element) {
            case 'okResponse':
                combinedDecorators.push(
                    ApiOkResponse({
                        ...returnDecorator(props[element]),
                    })
                );
                break;
            case 'createdResponse':
                combinedDecorators.push(
                    ApiCreatedResponse(returnDecorator(props[element]))
                );
                break;
            case 'serverError':
                combinedDecorators.push(
                    ApiInternalServerErrorResponse(
                        returnDecorator(props[element])
                    )
                );
                break;
            case 'forbidden':
                combinedDecorators.push(
                    props[element].schema &&
                        ApiForbiddenResponse(returnDecorator(props[element])),
                    ApiExtraModels(props[element].schema)
                );
                break;
            case 'notExists':
                combinedDecorators.push(
                    ApiNotFoundResponse(returnDecorator(props[element]))
                );
                break;
            case 'conflict':
                combinedDecorators.push(
                    ApiConflictResponse(returnDecorator(props[element]))
                );
                if (props[element].schema)
                    ApiExtraModels(props[element].schema);
                break;
            case 'unauthorized':
                combinedDecorators.push(
                    ApiUnauthorizedResponse(returnDecorator(props[element]))
                );
                break;
        }
        if (props[element].schema)
            combinedDecorators.push(ApiExtraModels(props[element].schema));
    });
    return applyDecorators(...combinedDecorators);
};
