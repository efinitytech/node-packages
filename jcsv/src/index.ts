const jcsv = <T>(json: T[]): string => {
    const keys = getKeys(json);
    return `${keys.join(',')}
${getCSVBody(json, keys)}`;
};

const getKeys = <T>(json: T[]) => json.reduce<Array<keyof T>>((acc, i) => {
    (Object.keys(i) as Array<keyof typeof i>).forEach((k) => {
        if (acc.indexOf(k) === -1) {
            acc.push(k);
        }
    });
    return acc;
}, []);

const getCSVBody = <T>(json: T[], keys: (keyof T)[]) => json.map(i => {
    return keys.map(k => {
        const p = i[k];
        if (Array.isArray(p)) {
            return serializeArray(p);
        }
        return serializeString(`${i[k] ?? ''}`);
    }).join(',');
}).join('\n');

const serializeArray = (v: any[]) => `"${v.join(',')}"`;
const serializeString = (v: string) => v.includes(',')
    ? `"${v}"`
    : v;

export default jcsv;
