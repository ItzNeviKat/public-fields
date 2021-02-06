import { isOnExtractingMethodKey } from './keys';

/**
 * @description OnExtracting decorator, method will executed when extracting public fields
 * @returns Decorator
 */
export function OnExtracting() {
  return (target: Object , propertyKey: string, descriptor: PropertyDescriptor) => {
    // Defining isOnExtractingMethod metadata
    Reflect.defineMetadata(isOnExtractingMethodKey, true, target, propertyKey);
  }
}
