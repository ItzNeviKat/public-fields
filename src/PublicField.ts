import { PublicFieldOptions } from './interfaces';
import { isPublicFieldKey, conditionalPublicFieldKey } from './keys';

/**
 * @param options Options for PublicField decorator
 * @description PublicField decorator, makes field is public for this module
 * @returns Decorator
 */
export function PublicField(options?: PublicFieldOptions) {
  return (target: Object , propertyKey: string) => {
    // Defining isPublic metadata
    Reflect.defineMetadata(isPublicFieldKey, true, target, propertyKey);

    // If condition in options provided
    if (options?.condition) {
      // Defining condition metadata
      Reflect.defineMetadata(
        conditionalPublicFieldKey,
        options.condition,
        target,
        propertyKey
      );
    }
  }
}
