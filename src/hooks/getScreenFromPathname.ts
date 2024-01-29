import { navigationLinking } from "../navigators/RootNavigator";
import { CurrentScreenType } from "./withUrl";

export default function getScreenFromPathname(pathname: string): CurrentScreenType {
    const [, routeStack, routeScreen] = pathname.split('/');
    let currentScreen: CurrentScreenType | null = null;

    if (routeStack) {
        const linking: any = navigationLinking.config?.screens;
        if (linking) {
            for (const stackName in linking) {
                const currStack = linking[stackName];
                if (currStack?.path === routeStack) {
                    if (routeScreen) {
                        for (const screenName in currStack.screens) {
                            const currScreen = currStack.screens[screenName];
                            if (currScreen === routeScreen) {
                                //@ts-ignore
                                currentScreen = { stack: stackName, screen: screenName };
                                break;
                            }
                        }
                    }
                    if (!currentScreen) {
                        //@ts-ignore
                        currentScreen = { stack: stackName, screen: 'MainScreen' };
                    }
                }
            }
        }
    }

    if (!currentScreen) {
        currentScreen = {
            stack: 'MenuStack',
            screen: 'MainScreen'
        };
    }

    return currentScreen;
}