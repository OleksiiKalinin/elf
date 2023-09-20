import { navigationLinking } from "../navigators/RootNavigator";

export default function getScreenFromPathname(pathname: string): string {
    const [, routeStack, routeScreen] = pathname.split('/');
    let currentScreen = '';

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
                                currentScreen = stackName + '-' + screenName;
                                break;
                            }
                        }
                    }
                    if (!currentScreen) {
                        currentScreen = stackName + '-' + 'MainScreen';
                    }
                }
            }
        }
    }

    return currentScreen || 'MenuStack-MainScreen';
}