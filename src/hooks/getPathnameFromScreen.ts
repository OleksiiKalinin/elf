import { navigationLinking } from "../navigators/RootNavigator";
import { CurrentScreenType } from "./withUrl";

export default function getPathnameFromScreen(initScreen: CurrentScreenType): string {
    const { stack, screen } = initScreen;
    let pathname = '/';

    if (stack) {
        const routeStack: any = navigationLinking.config?.screens[stack];
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