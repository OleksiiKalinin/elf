import { Platform } from 'react-native';

const depthMap = {
    umbra: [
        '0px 2px 1px -1px',
        '0px 3px 1px -2px',
        '0px 3px 3px -2px',
        '0px 2px 4px -1px',
        '0px 3px 5px -1px',
        '0px 3px 5px -1px',
        '0px 4px 5px -2px',
        '0px 5px 5px -3px',
        '0px 5px 6px -3px',
        '0px 6px 6px -3px',
        '0px 6px 7px -4px',
        '0px 7px 8px -4px',
        '0px 7px 8px -4px',
        '0px 7px 9px -4px',
        '0px 8px 9px -5px',
        '0px 8px 10px -5px',
        '0px 8px 11px -5px',
        '0px 9px 11px -5px',
        '0px 9px 12px -6px',
        '0px 10px 13px -6px',
        '0px 10px 13px -6px',
        '0px 10px 14px -6px',
        '0px 11px 14px -7px',
        '0px 11px 15px -7px',
    ],
    penumbra: [
        '0px 1px 1px 0px',
        '0px 2px 2px 0px',
        '0px 3px 4px 0px',
        '0px 4px 5px 0px',
        '0px 5px 8px 0px',
        '0px 6px 10px 0px',
        '0px 7px 10px 1px',
        '0px 8px 10px 1px',
        '0px 9px 12px 1px',
        '0px 10px 14px 1px',
        '0px 11px 15px 1px',
        '0px 12px 17px 2px',
        '0px 13px 19px 2px',
        '0px 14px 21px 2px',
        '0px 15px 22px 2px',
        '0px 16px 24px 2px',
        '0px 17px 26px 2px',
        '0px 18px 28px 2px',
        '0px 19px 29px 2px',
        '0px 20px 31px 3px',
        '0px 21px 33px 3px',
        '0px 22px 35px 3px',
        '0px 23px 36px 3px',
        '0px 24px 38px 3px',
    ],
    ambient: [
        '0px 0px 0px 0px',
        '0px 1px 3px 0px',
        '0px 1px 5px 0px',
        '0px 1px 8px 0px',
        '0px 1px 10px 0px',
        '0px 1px 14px 0px',
        '0px 1px 18px 0px',
        '0px 2px 16px 1px',
        '0px 3px 14px 2px',
        '0px 3px 16px 2px',
        '0px 4px 18px 3px',
        '0px 4px 20px 3px',
        '0px 5px 22px 4px',
        '0px 5px 24px 4px',
        '0px 5px 26px 4px',
        '0px 6px 28px 5px',
        '0px 6px 30px 5px',
        '0px 6px 32px 5px',
        '0px 7px 34px 6px',
        '0px 7px 36px 6px',
        '0px 8px 38px 7px',
        '0px 8px 40px 7px',
        '0px 8px 42px 7px',
        '0px 9px 44px 8px',
        '0px 9px 46px 8px',
    ],
};

const androidColor = {
    umbra: 'rgba(0,0,0,0.13)',
    penumbra: 'rgba(0,0,0,0.07)',
    ambient: 'rgba(0,0,0,0.05)',
};

/**
 * 
 * @param depth 
 * 0 will return {} empty object (no shadow), shadow values from 1 to 24 (any value below or above will be ignored and rounded to nearest edge)
 * 
 * @returns 
 * StyleSheet style object
 */

export default function useShadow(depth: number) {
    if (depth === 0) return {};

    const d = Math.min(Math.max(depth, 1), 24) - 1;

    function interpolate(i: number, a: number, b: number, a2: number, b2: number) {
        return (i - a) * (b2 - a2) / (b - a) + a2;
    }

    const shadow = ((raw: string) => {
        const [x, y, blur] = raw.split(' ').map(val => +val.replace('px', ''));
        return {
            blur,
            x,
            y: y === 1 ? 1 : Math.floor(y * 0.5),
        };
    })(depthMap.penumbra[d]);

    return Platform.select({
        web: {
            // boxShadow: `
            //     ${Math.max(shadow.x - 5, 0)}px
            //     ${Math.max(shadow.y + 3, 1)}px
            //     ${shadow.blur}px
            //     0
            //     rgba(0,0,0,0.2)
            // `,
            boxShadow: `
                ${depthMap.umbra[d]} ${androidColor.umbra},
                ${depthMap.penumbra[d]} ${androidColor.penumbra},
                ${depthMap.ambient[d]} ${androidColor.ambient}
            `,
        },
        ios: {
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: shadow.y,
            },
            shadowOpacity: interpolate(d, 1, 24, 0.2, 0.6),
            shadowRadius: interpolate(shadow.blur, 1, 38, 1, 16),
        },
        android: {
            shadowColor: '#000',
            elevation: d + 1,
        }
    });
}