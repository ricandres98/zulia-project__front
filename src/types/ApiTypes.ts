// export type ResponseTuple<T> = [null | Error, T | null];
export type ResponseTuple<T> = [null, T] | [Error, null];
