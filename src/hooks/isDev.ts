import { Platform } from "react-native";
import windowExists from "./windowExists"
console.log('__DEV__', __DEV__);

const isDev = () => Platform.select({
    default: __DEV__,
    // native: __DEV__,
    // web: Boolean(windowExists() && window?.location?.host?.includes('localhost'))
});

export default isDev;