import { UseLinkProps, useLink as solitoLink } from "solito/link";
import { useRouter as useSolitoRouter } from 'solito/router';
import { useActions } from "./useActions";
import { useTypedSelector } from "./useTypedSelector"
import withUrl, { WithUrlProps } from "./withUrl";
import windowExists from "./windowExists";
import { createParam } from "solito";
import { FC, ReactElement, ReactNode, useEffect, useRef } from "react";
import { Platform } from "react-native";
import { cloneDeep } from "lodash";
import GoogleMap from "../components/organismes/GoogleMap";
import getPathnameFromScreen from "./getPathnameFromScreen";
import { RootStackParamList } from "../navigators/RootNavigator";
import ChooseAdvertScreen from "../screens/CalendarScreens/ChooseAdvertScreen";
import ChooseCandidateScreen from "../screens/CalendarScreens/ChooseCandidateScreen";

export type SubViewType<T extends keyof RootStackParamList = keyof RootStackParamList> = T extends T ? AllScreens<T, keyof RootStackParamList[T]['default']> : never;
type AllScreens<T extends keyof RootStackParamList, K extends keyof RootStackParamList[T]['default'] = keyof RootStackParamList[T]['default']> = K extends K ? AllParams<RootStackParamList[T]['default'][K]> : never;
type AllParams<T> = T extends { subView?: any } ? T['subView'] : never;


type ReplaceParams = Parameters<ReturnType<typeof useSolitoRouter>['replace']>;
type PushParams = Parameters<ReturnType<typeof useSolitoRouter>['push']>;

const { useParams } = createParam<{ subView?: SubViewType }>();

let componentProps: any = null;
//f*cking fix of 4x params re-render???
let prevParams: string | undefined = undefined;

export default function useRouter() {
    const { currentScreen, swipeablePanelProps } = useTypedSelector(s => s.general);
    const { setSwipeablePanelProps } = useActions();
    const { back, parseNextPath, push, replace } = useSolitoRouter();
    const { params, setParams } = useParams();

    const preProcessHandler = () => {
        // console.log('pressed');
    }

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
                props.params?.subView === 'ChooseCandidateScreen'
            )) ||
            false //something else
        ) {
            exec(props.params);
        }

        return withUrl(newProps);
    }

    useEffect(() => {
        if (prevParams !== params.subView) {
            prevParams = params.subView;
            let Component: FC<any> | null = null;

            if ((Platform.OS !== 'web' || windowExists()) && !!params?.subView) {
                if (params.subView === 'GoogleMap') {
                    Component = GoogleMap;
                } else if (params.subView === 'ChooseAdvertScreen') {
                    Component = ChooseAdvertScreen;
                } else if (params.subView === 'ChooseCandidateScreen') {
                    Component = ChooseCandidateScreen
                } else {
                    return;
                }

                if (!!componentProps && !!Component) {
                    setTimeout((Component) => {
                        setSwipeablePanelProps({
                            mode: 'screen',
                            children: <Component {...componentProps} />
                        })
                    }, 100, Component);
                } else {
                    setParams({ subView: undefined });
                }
            } else {
                setSwipeablePanelProps(null);
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
                // setSwipeablePanelProps(null);
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