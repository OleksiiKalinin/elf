export type CorrectNumericValueOptionsType = {
    /**@default MIN_SAFE_INTEGER */
    min?: number,
    /**@default MAX_SAFE_INTEGER */
    max?: number,
    /**@default 0 */
    minLength?: number,
    /**@default 100 */
    maxLength?: number,
    /**@default 2 */
    toFixed?: number,
    /**@default "," */
    decimalSeparator?: string,
}

/**@todo 
 * * float numbers problem 
 * * minLength
 * * maxLength
 * */
export default function correctNumericValue(value: string, options?: CorrectNumericValueOptionsType): string {
    const { toFixed = 2, max = Number.MAX_SAFE_INTEGER, min = Number.MIN_SAFE_INTEGER, decimalSeparator = ',' } = options || {};

    let correctedValue = value.replace(/[^0-9.,]/g, '').replace(/^0+(\d)/, '$1').replace(/[.,]/g, '_');

    const underscoreIndex = correctedValue.indexOf('_');
    if (underscoreIndex !== -1) {
        correctedValue = correctedValue.slice(0, underscoreIndex + 1) +
            correctedValue.slice(underscoreIndex + 1).replace('_', '');
    }

    if (correctedValue.startsWith('_')) {
        correctedValue = '0' + correctedValue.slice(1);
    }

    if (correctedValue.startsWith('.')) {
        correctedValue = '0' + correctedValue;
    }

    const lastChar = correctedValue.slice(-1);
    if (lastChar === '.' || lastChar === ',') {
        correctedValue = correctedValue.slice(0, -1) + lastChar;
    }

    correctedValue = correctedValue.replace('_', decimalSeparator);

    const floatValue = parseFloat(correctedValue);
    if (!isNaN(floatValue)) {
        correctedValue = Math.max(min, Math.min(max, floatValue)).toFixed(Number.isInteger(floatValue) ? 0 : toFixed);
    }

    return correctedValue;
}
