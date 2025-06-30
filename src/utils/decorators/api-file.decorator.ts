import { ApiBody } from '@nestjs/swagger';

export const ApiMultiFile =
  (fileName: string = 'files'): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      type: 'multipart/form-data',
      required: true,
      schema: {
        type: 'object',
        properties: {
          [fileName]: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      },
    })(target, propertyKey, descriptor);
  };

export const ApiFile = (
  fieldName: string = 'file',
  options: { required?: boolean } = { required: true },
): MethodDecorator => {
  return ApiBody({
    schema: {
      type: 'object',
      properties: {
        [fieldName]: {
          type: 'string',
          format: 'binary',
        },
      },
      required: options.required ? [fieldName] : [],
    },
  });
};
