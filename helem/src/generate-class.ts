export default function generateClass() {
    const next = () => (~~(Math.random() * 36)).toString(36)
    return ((~~(Math.random() * 26)) + 10).toString(36) + [...Array(7)].map(next).join(''); 
}
