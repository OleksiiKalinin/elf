import { UseLinkProps, useLink as solitoLink } from "solito/link";
import { useRouter as useSolitoRouter } from 'solito/router';
import { useActions } from "./useActions";
import { useTypedSelector } from "./useTypedSelector"
import withUrl, { WithUrlProps } from "./withUrl";
import windowExists from "./windowExists";

type OverwriteWithUrlProps<T extends any[]> = T extends [any, ...infer R] ? [url: WithUrlProps, ...R] : never

export default function useRouter() {
    const {currentScreen} = useTypedSelector(s => s.general);
    const {setSwipeablePanelProps} = useActions();
    const {back, parseNextPath, push, replace} = useSolitoRouter();

    const preProcessHandler = () => {
        console.log('pressed');
    }

    return {
        useLink: ({href, ...props}: Omit<UseLinkProps, 'href'> & {href: WithUrlProps}): ReturnType<typeof solitoLink> => {
            const linking = solitoLink({...props, href: withUrl(href)});

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
            if (windowExists()) {
                if (!!(window as any).prevPage) back();
                else replace(withUrl({stack: 'MenuStack'}));
            }
        },
        push: ([url, ...props]: OverwriteWithUrlProps<Parameters<typeof push>>) => {
            preProcessHandler();
            push(...[withUrl(url), ...props]);
        },
        replace: ([url, ...props]: OverwriteWithUrlProps<Parameters<typeof replace>>) => {
            preProcessHandler();
            replace(...[withUrl(url), ...props]);
        },
    }
}