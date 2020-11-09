export function createElement<T extends HTMLElement = HTMLElement>(tag: string, props?: Partial<T>, attr?: { [qualifiedName: string]: any }, createOptions?: ElementCreationOptions) {
    const element = document.createElement(tag, createOptions ?? {}) as T;
    if (props) {
        // Element properties
        for (const a in props) {
            const value = props[a];
            if (typeof value === 'object') {
                for (const k in value) {
                    element[a][k] = value[k] as any;
                }
            } else {
                element[a] = value as any;
            }
        }

        // Attributes
        for (const k in attr) {
            element.setAttribute(k, attr[k]);
        }
    }

    return element;
}

export interface ElementConfiguration<T extends HTMLElement> {
    props?: Partial<T>
    attr?: { [qualifiedName: string]: any }
    createOptions?: ElementCreationOptions
    events?: { [name: string]: EventListener | EventListener[] }
}
