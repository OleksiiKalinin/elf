import { forIn, isPlainObject } from "lodash";
import { AllNestedParamList } from "../navigators/RootNavigator";
import getPathnameFromScreen from "./getPathnameFromScreen";

type Props<T extends keyof AllNestedParamList = keyof AllNestedParamList> = T extends T ? Stack<T> : never;

type Stack<T extends keyof AllNestedParamList> = {
    stack: T,
} & (Screens<T, keyof AllNestedParamList[T]> | {screen?: undefined, params?: any});

type Screens<T extends keyof AllNestedParamList, K extends keyof AllNestedParamList[T] = keyof AllNestedParamList[T]> = K extends K ? Screen<T, K> : never;

type Screen<T extends keyof AllNestedParamList, K extends keyof AllNestedParamList[T]> = {
    screen: K,
} & OptionalParams<AllNestedParamList[T][K]>;

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