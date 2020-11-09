export default function generateClass() {
    const next = () => (~~(Math.random() * 36)).toString(36)
    return `helem-${[...Array(7)].map(next).join('')}`;
}
