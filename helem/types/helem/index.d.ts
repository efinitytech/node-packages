type ExtractType<O extends object, T> = Pick<O, {
    [K in keyof O]: O[K] extends T ? K : never
}[keyof O]>