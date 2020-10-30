export function createStyles(className: string, css: JSS) {
    const style = document.createElement('style') as HTMLStyleElement;
    style.id = `s-${className}`;
    style.textContent = Object.entries(css).map(
        ([selector, declaration]) => `.${className} ${selector} {
${Object.entries(declaration).map(([k, v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${v ?? 'inherit'};`).join('\n')}
}`
    ).join('\n')
    return style;
}
