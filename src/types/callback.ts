export type Callback<TArgs = any, TResult = any> = (
  ...args: TArgs[]
) => TResult;
