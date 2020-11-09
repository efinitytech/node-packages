import generateClass from "../generate-class";
import { ElementConfiguration } from "./create-element";
import { createStyles, JSS } from "./create-styles";
import el, { Child } from "./el";

export interface Helem {
    <T extends HTMLElement = HTMLElement>(tag: string): () => T
    <T extends HTMLElement = HTMLElement>(tag: string, options: ComponentConfiguration<T>, children?: Child[]): () => T
    <T extends HTMLElement = HTMLElement>(tag: string, children: Child[]): () => T
    <T extends HTMLElement = HTMLElement>(tag: string, p0?: ComponentConfiguration<T> | Child[], p1?: Child[]): () => T
}

const helem: Helem = function<T extends HTMLElement = HTMLElement>(tag: string, p0?: ComponentConfiguration<T> | Child[], p1?: Child[]): () => T {
    // Determine input types:
    let config = Array.isArray(p0) ? null : p0;
    let children = Array.isArray(p0) ? p0 : p1;

    const { props, attr, events, css, createOptions } = config ?? {};

    // Generate class and styles if necessary:
    const className = generateClass();
    let style: HTMLElement;
    if (css) {
        style = createStyles(className, css);
    }

    // Return creation function
    return () => {
        // Create the element:
        const element = el<T>(tag, { props, attr, events, createOptions }, children);

        // Apply styles
        if (css) {
            if (!document.querySelector(`style#s-${className}`)) {
                document.head.appendChild(style);
            }
            element.classList.add(className);
        }

        return element;
    }
}

export default helem;

export interface ComponentConfiguration<T extends HTMLElement> extends ElementConfiguration<T> {
    css?: JSS
}
