import { forIn, isPlainObject } from "lodash";
import { RootStackParamList } from "../navigators/RootNavigator";
import getPathnameFromScreen from "./getPathnameFromScreen";

type Props<T extends keyof RootStackParamList = keyof RootStackParamList> = T extends T ? Stack<T> : never;

type Stack<T extends keyof RootStackParamList> = {
    stack: T,
} & (Screens<T, keyof RootStackParamList[T]> | {screen?: undefined, params?: any});

type Screens<T extends keyof RootStackParamList, K extends keyof RootStackParamList[T] = keyof RootStackParamList[T]> = K extends K ? Screen<T, K> : never;

type Screen<T extends keyof RootStackParamList, K extends keyof RootStackParamList[T]> = {
    screen: K,
} & OptionalParams<RootStackParamList[T][K]>;

type OptionalParams<T> = [T] extends [undefined] ? { params?: any } : T extends undefined ? { params?: any } : { params: T };

export default function withUrl({ stack, screen = 'MainScreen', params = undefined }: Props): string {
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