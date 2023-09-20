import { navigationLinking } from "../navigators/RootNavigator";

export default function getPathnameFromScreen(initScreen: string): string {
    const [stack, screen] = initScreen.split('-');
    let pathname = '/';

    if (stack) {
        const routeStack: any = (navigationLinking.config?.screens as any)[stack];
        if (routeStack?.path) {
            pathname += routeStack?.path;
            const routeScreen = routeStack.screens?.[screen];
            if (routeScreen) {
                pathname += ('/' + routeScreen);
            }

        }
    }

    return pathname;
}