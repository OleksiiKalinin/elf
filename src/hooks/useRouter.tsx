import { UseLinkProps, useLink as solitoLink } from "solito/link";
import { useRouter as useSolitoRouter } from 'solito/router';
import { useActions } from "./useActions";
import { useTypedSelector } from "./useTypedSelector"
import withUrl, { WithUrlProps } from "./withUrl";
import windowExists from "./windowExists";
import { createParam } from "solito";
import { FC, ReactElement, ReactNode, useEffect, useRef } from "react";
import { Platform, View } from "react-native";
import { cloneDeep } from "lodash";
import GoogleMap from "../components/organismes/GoogleMap";
import getPathnameFromScreen from "./getPathnameFromScreen";
import { RootStackParamList } from "../navigators/RootNavigator";
import ChooseAdvertScreen from "../screens/CalendarScreens/ChooseAdvertScreen";
import ChooseCandidateScreen from "../screens/CalendarScreens/ChooseCandidateScreen";
import JobCategoryScreen from "../screens/JobCategoryScreen";
import Typography from "../components/atoms/Typography";
import { useFocusEffect } from "@react-navigation/native";

export type SubViewType<T extends keyof RootStackParamList = keyof RootStackParamList> = T extends T ? AllScreens<T, keyof RootStackParamList[T]['default']> : never;
type AllScreens<T extends keyof RootStackParamList, K extends keyof RootStackParamList[T]['default'] = keyof RootStackParamList[T]['default']> = K extends K ? AllParams<RootStackParamList[T]['default'][K]> : never;
type AllParams<T> = T extends { subView?: any } ? T['subView'] : never;


type ReplaceParams = Parameters<ReturnType<typeof useSolitoRouter>['replace']>;
type PushParams = Parameters<ReturnType<typeof useSolitoRouter>['push']>;

const { useParams } = createParam<{ subView?: SubViewType }>();

let componentProps: any = null;

//f*cking fix of 4x params re-render???
let prevParams: string | undefined = undefined;

let paramsGeneralHandlerAccess = true;

const validateUrl = (props: WithUrlProps): string => {
    const newProps: WithUrlProps = cloneDeep(props);

    const exec = (props: any) => {
        const { subView, ...params } = props;
        componentProps = params;
        newProps.params = { subView };
    }

    if (
        (props.stack === 'CalendarStack' && props.screen === 'EventScreen' && (
            props.params?.subView === 'GoogleMap' ||
            props.params?.subView === 'ChooseAdvertScreen' ||
            props.params?.subView === 'ChooseCandidateScreen' ||
            // Test
            props.params?.subView === 'JobCategoryScreen'
        )) ||
        false //something else
    ) {
        exec(props.params);
    }

    return withUrl(newProps);
}

export default function useRouter() {
    const { currentScreen, swipeablePanelProps } = useTypedSelector(s => s.general);
    const { setSwipeablePanelProps } = useActions();
    const { back, parseNextPath, push, replace } = useSolitoRouter();
    const { params, setParams } = useParams();
    const paramsLocalHandlerAccess = useRef(false);

    const preProcessHandler = () => {
        // console.log('pressed');
    }

    useEffect(() => {
        return () => {
            paramsGeneralHandlerAccess = true;
        }
    }, []);

    useEffect(() => {
        if (prevParams !== params?.subView) {
            prevParams = params?.subView;

            if (paramsGeneralHandlerAccess || paramsLocalHandlerAccess.current) {
                paramsGeneralHandlerAccess = false;
                paramsLocalHandlerAccess.current = true;

                let Component: FC<any> | null = null;

                if ((Platform.OS !== 'web' || windowExists()) && !!params?.subView) {
                    if (params.subView === 'GoogleMap') {
                        Component = GoogleMap;
                    } else if (params.subView === 'ChooseAdvertScreen') {
                        Component = ChooseAdvertScreen;
                    } else if (params.subView === 'ChooseCandidateScreen') {
                        Component = ChooseCandidateScreen
                        // Test
                    } else if (params.subView === 'JobCategoryScreen') {
                        Component = JobCategoryScreen
                    } else {
                        return;
                    }

                    if (!!componentProps && !!Component) {
                        setSwipeablePanelProps({
                            mode: 'screen',
                            children: <Component {...componentProps} />
                        })
                    } else {
                        setParams({ subView: undefined });
                    }
                } else {
                    setSwipeablePanelProps(null);
                }
            }
        }
    }, [params]);

    return {
        useLink: ({ href, ...props }: Omit<UseLinkProps, 'href'> & { href: WithUrlProps }): ReturnType<typeof solitoLink> => {
            const linking = solitoLink({ ...props, href: validateUrl(href) });

            return {
                ...linking,
                onPress: (e) => {
                    preProcessHandler();
                    linking.onPress(e);
                }
            }
        },
        parseNextPath,
        back: () => {
            if (Platform.OS !== 'web' || windowExists() && window.history && window.history.state && window.history.state.idx > 0) {
                back();
            } else {
                const [stack, screen] = currentScreen.split('-');
                replace(withUrl({ stack: (screen === 'MainScreen' ? 'MenuStack' : stack as any) }));
            }
        },
        backToRemoveParams: () => {
            if (Platform.OS !== 'web' && !!swipeablePanelProps) {
                replace(getPathnameFromScreen(currentScreen))
                setSwipeablePanelProps(null);
            } else {
                back();
            }
        },
        push: (url: WithUrlProps, as?: PushParams[1], transitionOptions?: PushParams[2]) => {
            preProcessHandler();
            push(validateUrl(url), as, transitionOptions);
        },
        replace: (url: WithUrlProps, as?: ReplaceParams[1], transitionOptions?: ReplaceParams[2]) => {
            preProcessHandler();
            replace(validateUrl(url), as, transitionOptions);
        },
    }
}