import { ExtractType } from "../types";

export type JSS = { [selector: string]: Partial<ExtractType<CSSStyleDeclaration, string>> };

export function createStyles(className: string, css: JSS) {
    let style = (document.querySelector('style[helem]') ?? document.createElement('style')) as HTMLStyleElement;
    if (!style.getAttribute('helem')) {
        style.attributes.setNamedItem(document.createAttribute('helem'));
    }
    style.textContent += '\n' + Object.entries(css).map(
        ([selector, declaration]) => `.${className}${/^[\w.]/.test(selector) ? ' ' : ''}${selector} {
    ${Object.entries(declaration).map(([k, v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${v ?? 'inherit'};`).join('\n\t')}
}`
    ).join('\n')
    return style;
}
