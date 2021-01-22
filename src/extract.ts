import { conditionalPublicFieldKey, isPublicFieldKey } from './keys';

/**
 * @param model Model of class with public fields
 * @param args Arguments for extracting like conditions
 */
export function extractPublicFields<T extends Object>(model: T, args?: Record<string, boolean>): T {
  const result: Partial<T> = {};
  const target = Object.getPrototypeOf(model);

  for (const prop in model) {
    if (!model.hasOwnProperty(prop)) continue;

    const isPublicField = Reflect.getMetadata(isPublicFieldKey, target, prop);
    const condition = Reflect.getMetadata(conditionalPublicFieldKey, target, prop);
    if (isPublicField) {
      if (condition && (!args || !args[condition])) continue;

      if (model[prop] instanceof Array) {
        result[prop] = extractPublicFieldsFromArray(model[prop] as unknown as Object[], args) as T[Extract<any, any>];
        continue;
      } if (model[prop] instanceof Object) {
        result[prop] = extractPublicFields(model[prop], args);
        continue;
      }
      result[prop] = model[prop];
    }
  }

  return result as T;
}

/**
 * @param models Array of models of class with public fields
 * @param args Arguments for extracting like conditions
 * @param someItemArgs Will execute with each model and you can return arguments specific for current model
 */
export function extractPublicFieldsFromArray<T extends Object>(
    models: T[],
    args?: Record<string, boolean>,
    someItemArgs?: (item: T) => Record<string, boolean> | false | undefined
): T[] {
  const result: T[] = [];

  for (const model of models) {
    const modelResult: Partial<T> = {};
    const target = Object.getPrototypeOf(model);

    for (const prop in model) {
      if (!model.hasOwnProperty(prop)) continue;

      const isPublicField: boolean = Reflect.getMetadata(isPublicFieldKey, target, prop);
      const condition: string = Reflect.getMetadata(conditionalPublicFieldKey, target, prop);
      const itemArgs: Record<string, boolean> | false | undefined = someItemArgs ? someItemArgs(model) : {};

      if (isPublicField) {
        if (
            condition &&
            (
                (
                    !args ||
                    !args[condition]
                ) && !itemArgs[condition]
            )
        ) continue;

        if (model[prop] instanceof Object) {
          modelResult[prop] = extractPublicFields(model[prop], itemArgs ? { ...itemArgs, ...args } : args);
          continue;
        }
        modelResult[prop] = model[prop];
      }
    }

    result.push(modelResult as T);
  }

  return result as T[];
}