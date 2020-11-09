import { createElement, ElementConfiguration } from "./create-element";

function el<T extends HTMLElement = HTMLElement>(tag: string): T
function el<T extends HTMLElement = HTMLElement>(tag: string, options: ElementConfiguration<T>, children?: Child[]): T
function el<T extends HTMLElement = HTMLElement>(tag: string, children: Child[]): () => T
function el<T extends HTMLElement = HTMLElement>(tag: string, p0?: ElementConfiguration<T> | Child[], p1?: Child[]): T {
    // Determine input types:
    let config = Array.isArray(p0) ? null : p0;
    let children = Array.isArray(p0) ? p0 : p1;

    // Create the element:
    const { props, attr, events, createOptions } = config ?? {};
    const element = createElement<T>(tag, props, attr, createOptions);

    // Apply event listeners
    if (events) {
        Object.entries(events).forEach(([event, listener]) => {
            if (Array.isArray(listener)) {
                listener.forEach(l => element.addEventListener(event, l))
            } else {
                element.addEventListener(event, listener)
            }
        });
    }

    // Add event listeners:
    if (children) {
        children.forEach((c) => {
            if (typeof c === 'function') {
                c = c();
            }
            if (c instanceof Element) {
                element.appendChild(c)
            } else {
                element.innerHTML += c;
            }
        });
    }

    return element;
}

export default el;

export type Child = HTMLElement | string | (() => HTMLElement) | (() => string)
