export default function hoursToMinutes(value: string): number {
    const [hours, minutes] = value.split(':');
    return Number(hours) * 60 + Number(minutes);
}