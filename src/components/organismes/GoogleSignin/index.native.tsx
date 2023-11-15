import { GoogleSigninProviderProps } from '.';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { googleSigninConfig } from '../AppUnifiedProvider';

const GoogleSigninProvider = ({ children }: GoogleSigninProviderProps) => {
    GoogleSignin.configure(googleSigninConfig);

    return children;
};

const googleSignOut = GoogleSignin.signOut;
const hasPlayServices = GoogleSignin.hasPlayServices;
const signIn = GoogleSignin.signIn;
const getTokens = GoogleSignin.getTokens;

export {
    googleSignOut,
    GoogleSigninProvider,
    hasPlayServices,
    signIn,
    getTokens,
};