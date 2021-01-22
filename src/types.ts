export type TArgs = Record<string, boolean>;
export type TSomeItemArgs<T> = (item: T) => TArgs | false | undefined;
