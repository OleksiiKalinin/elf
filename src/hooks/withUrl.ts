import { forIn, isPlainObject } from "lodash";
import { RootStackParamList } from "../navigators/RootNavigator";
import getPathnameFromScreen from "./getPathnameFromScreen";

export type WithUrlProps<T extends keyof RootStackParamList = keyof RootStackParamList> = T extends T ? Stack<T> : never;

type Stack<T extends keyof RootStackParamList> = {
    stack: T,
} & (Screens<T, keyof RootStackParamList[T]['default']> | {screen?: undefined, params?: any});

type Screens<T extends keyof RootStackParamList, K extends keyof RootStackParamList[T]['default'] = keyof RootStackParamList[T]['default']> = K extends K ? Screen<T, K> : never;

type Screen<T extends keyof RootStackParamList, K extends keyof RootStackParamList[T]['default']> = {
    screen: K,
} & OptionalParams<RootStackParamList[T]['default'][K]>;

type OptionalParams<T> = [T] extends [undefined] ? { params?: any } : { params: T };
// type OptionalParams<T> = [T] extends [undefined] ? {params?: never} : T extends undefined ? { params?: any } : { params: T };

export default function withUrl({ stack, screen = 'MainScreen', params = undefined }: WithUrlProps): string {
    let url = getPathnameFromScreen(stack + '-' + screen);
    if (isPlainObject(params)) {
        const query: string[] = [];
        forIn(params, (value, key) => {
            if (typeof value === 'string') {
                query.push(key + '=' + value);
            }
        });
        url += '?' + query.join('&');
    }

    return url;
}