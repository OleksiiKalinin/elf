export default function hasKey(object: {}, key: string): boolean {
    return Object.keys(object).includes(key);
}