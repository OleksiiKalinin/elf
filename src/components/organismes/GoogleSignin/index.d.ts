import { GoogleSignin } from "@react-native-google-signin/google-signin";

export interface GoogleSigninProviderProps {
    children: ReactNode
}

declare const GoogleSigninProvider: React.FC<GoogleSigninProviderProps>;
declare const googleSignOut: () => void;
declare const hasPlayServices: typeof GoogleSignin.hasPlayServices;
declare const signIn: typeof GoogleSignin.signIn;
declare const getTokens: typeof GoogleSignin.getTokens;

export {
    GoogleSigninProvider,
    googleSignOut,
    hasPlayServices,
    signIn,
    getTokens,
};