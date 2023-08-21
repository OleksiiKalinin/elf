export default function minutesToHours(init: string | number): string {
    const value = Number(init);
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
}