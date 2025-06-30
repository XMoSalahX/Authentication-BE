import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
class UniqueKeysConstraint implements ValidatorConstraintInterface {
  duplicateKey: string | null = null;

  async validate(keys: any[], args: ValidationArguments) {
    // Retrieve the array of keys to be checked for uniqueness
    const uniqueKeys = args.constraints[0] as string[];

    // Extract the value of the property being validated (expecting an array of any DTO)
    const value = args.object[args.property] as any[];

    // Iterate over each specified key to check for duplicates
    for (const uniqueKey of uniqueKeys) {
      const seenValues = new Set<string>();

      for (const item of value) {
        const keyValue = item[uniqueKey]?.toLowerCase?.();

        if (keyValue) {
          // Check if this value has been seen already
          if (seenValues.has(keyValue)) {
            this.duplicateKey = uniqueKey;
            return false;
          }
          seenValues.add(keyValue);
        }
      }
    }
    // Reset duplicateKey if no duplicates were found
    return true;
  }

  defaultMessage(): string {
    return `Duplicate value in "${this.duplicateKey}"`;
  }
}

export function UniqueKeys(
  uniqueKeys: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [uniqueKeys],
      validator: UniqueKeysConstraint,
    });
  };
}
