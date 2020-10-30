export function createElement<T extends HTMLElement = HTMLElement>(tag: string, attr?: Partial<T>, createOptions?: ElementCreationOptions) {
    const element = document.createElement(tag, createOptions ?? {}) as T;
    if (attr) {
        for (const a in attr) {
            const value = attr[a];
            if (typeof value === 'object') {
                for (const k in value) {
                    element[a][k] = value[k] as any;
                }
            } else {
                element[a] = value as any;
            }
        }
    }

    return element;
}
