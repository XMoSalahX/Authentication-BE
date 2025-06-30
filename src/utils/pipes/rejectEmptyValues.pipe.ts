import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';

export class RejectEmptyValuesPipe implements PipeTransform {
  constructor(
    private readonly rejectFalse = false,
    private readonly rejectZero = false,
  ) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body' && metadata.type !== 'query' && metadata.type !== 'param') {
      return value;
    }

    if (typeof value === 'object' && value !== null) {
      const errors: string[] = [];

      const checkValues = (obj: any, parentKey: string = '') => {
        Object.keys(obj).forEach(key => {
          const fullKey = parentKey ? `${parentKey}.${key}` : key;
          const val = obj[key];

          if (
            val === '' ||
            val === null ||
            val === undefined ||
            (typeof val === 'number' && (isNaN(val) || (this.rejectZero && val === 0))) ||
            (typeof val === 'boolean' && this.rejectFalse && val === false)
          ) {
            errors.push(`Field ${fullKey} cannot be empty`);
          } else if (typeof val === 'object' && val !== null) {
            checkValues(val, fullKey);
          } else if (Array.isArray(val)) {
            val.forEach((item, index) => {
              if (item === '' || item === null || item === undefined) {
                errors.push(`Field ${fullKey}[${index}] cannot be empty`);
              } else if (typeof item === 'object' && item !== null) {
                checkValues(item, `${fullKey}[${index}]`);
              }
            });
          }
        });
      };

      checkValues(value);

      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }
    }

    return value;
  }
}
