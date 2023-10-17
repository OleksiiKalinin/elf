import { UseLinkProps, useLink as solitoLink } from "solito/link";
import { useRouter as useSolitoRouter } from 'solito/router';
import { useActions } from "./useActions";
import { useTypedSelector } from "./useTypedSelector"
import withUrl, { WithUrlProps } from "./withUrl";
import windowExists from "./windowExists";
import { createParam } from "solito";
import { useEffect, useRef } from "react";
import { Platform } from "react-native";
import { cloneDeep } from "lodash";
import GoogleMap from "../components/organismes/GoogleMap";

type ReplaceParams = Parameters<ReturnType<typeof useSolitoRouter>['replace']>;
type PushParams = Parameters<ReturnType<typeof useSolitoRouter>['push']>;

const { useParams } = createParam();

export default function useRouter() {
    const { currentScreen } = useTypedSelector(s => s.general);
    const { setSwipeablePanelProps } = useActions();
    const { back, parseNextPath, push, replace } = useSolitoRouter();
    const { params, setParams } = useParams();
    const bla = useRef<any>(null);

    const preProcessHandler = () => {
        console.log('pressed');
    }

    const validateUrl = (props: WithUrlProps) => {
        const { stack, screen = 'MainScreen', params = undefined } = props;
        const p: WithUrlProps = cloneDeep(props);

        if (stack === 'MenuStack' && screen === 'GoogleMap') {
            bla.current = params;
            p.screen = 'MainScreen';
            p.params = { subView: 'GoogleMap' };
        }

        return withUrl(p);
    }

    useEffect(() => {
        if ((Platform.OS !== 'web' || windowExists()) && !!params?.subView) {
            if (!!bla.current) {
                setTimeout(() => {
                    setSwipeablePanelProps({
                        mode: 'screen',
                        children: (() => {
                            if (params.subView === 'GoogleMap') {
                                return <GoogleMap {...bla.current} />
                            } else if (params.subView === 'GoogleMap') {

                            } else {
                                return null;
                            }
                        })()
                    })
                }, 100);
            } else {
                setParams({ subView: undefined });
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