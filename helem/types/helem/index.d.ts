type EventHandler = [string, EventListener];

interface ElementConfiguration<T extends HTMLElement> {
    attr?: Partial<T>
    createOptions?: ElementCreationOptions
    events?: { [name: string]: EventListener | EventListener[] }
}

interface ComponentConfiguration<T extends HTMLElement> extends ElementConfiguration<T> {
    css?: JSS
}

type JSS = { [selector: string]: Partial<ExtractType<CSSStyleDeclaration, string>> }

type ExtractType<O extends object, T> = Pick<O, {
    [K in keyof O]: O[K] extends T ? K : never
}[keyof O]>

type Child = HTMLElement | string | (() => HTMLElement) | (() => string)
