import { forIn, isPlainObject } from "lodash";
import { RootStackParamList } from "../navigators/RootNavigator";
import getPathnameFromScreen from "./getPathnameFromScreen";

export type WithUrlProps<T extends keyof RootStackParamList = keyof RootStackParamList> = T extends T ? Stack<T, true> : never;
export type CurrentScreenType<T extends keyof RootStackParamList = keyof RootStackParamList> = T extends T ? Stack<T, false> : never;

type Stack<T extends keyof RootStackParamList, params extends boolean> = {
    stack: T,
} &
    (Screens<T, params, keyof RootStackParamList[T]['default']> | (
        params extends true ?
        { screen?: undefined, params?: any }
        :
        never
    ));

type Screens<T extends keyof RootStackParamList, params extends boolean, K extends keyof RootStackParamList[T]['default'] = keyof RootStackParamList[T]['default']> = K extends K ? Screen<T, K, params> : never;

type Screen<T extends keyof RootStackParamList, K extends keyof RootStackParamList[T]['default'], params extends boolean> = {
    screen: K,
} & (params extends true ? OptionalParams<RootStackParamList[T]['default'][K]> : {});

type OptionalParams<T> = [T] extends [undefined] ? { params?: any } : { params: T };
// type OptionalParams<T> = [T] extends [undefined] ? {params?: never} : T extends undefined ? { params?: any } : { params: T };

export default function withUrl({ stack, screen = 'MainScreen', params = undefined }: WithUrlProps): string {
    //@ts-ignore
    let url = getPathnameFromScreen({ screen, stack });
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