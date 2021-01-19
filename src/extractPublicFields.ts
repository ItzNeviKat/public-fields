import { conditionalPublicFieldKey, isPublicFieldKey } from './keys';

/**
 * @param model Model of class with public fields
 * @param args Arguments for extracting like conditions
 */
export function extractPublicFields<T extends Object>(model: T, args?: Record<string, boolean>): T {
  const result: T | any = {};
  const target = Object.getPrototypeOf(model);

  for (const prop in model) {
    if (!model.hasOwnProperty(prop)) continue;

    const isPublicField = Reflect.getMetadata(isPublicFieldKey, target, prop);
    const condition = Reflect.getMetadata(conditionalPublicFieldKey, target, prop);
    if (isPublicField) {
      if (condition && (!args || !args[condition])) continue;

      if (typeof model[prop] === 'object') {
        result[prop] = extractPublicFields(model[prop], args);
        continue;
      }
      result[prop] = model[prop];
    }
  }

  return result;
}
