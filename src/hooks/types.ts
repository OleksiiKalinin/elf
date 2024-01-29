export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type NonNullableKeys<T> = { [K in keyof T]-?: NonNullable<T[K]>; }

export type PartialStrict<T> = { [K in keyof T]?: undefined; }

export type PartialStrictBy<T, K extends keyof T> = Omit<T, K> & PartialStrict<Pick<T, K>>

export type InitialPropsFromParams<T> = { [K in keyof T & string as `${K}Initial`]?: T[K] };