import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'RequireTogether', async: false })
export class RequireTogetherConstraint implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments) {
    const object = args.object as any;
    const fields = args.constraints[0] as string[];

    const providedFields = fields.filter(field => object[field] !== undefined);

    return providedFields.length === 0 || providedFields.length === fields.length;
  }

  defaultMessage(args: ValidationArguments) {
    return `Fields ${args.constraints[0].join(', ')} must be sent together or not at all.`;
  }
}
