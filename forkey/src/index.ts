type BooleanKeyboardEventHandler = (e?: KeyboardEvent) => boolean;

type KeyMap = {
    [p: string]: boolean | BooleanKeyboardEventHandler
};

const forkey = (km: KeyMap) => (e: KeyboardEvent) => {
    const { code, key } = e;

    const i = Object.keys(km).find(k => RegExp(`^(${code}|${key})$`, 'i').test(k));
    if (!i) return;
    const mapped = km[i];
    if (typeof mapped === 'function' ? mapped(e) : mapped) {
        e.preventDefault();
    }
}

export default forkey;
