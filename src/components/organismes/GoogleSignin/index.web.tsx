import { GoogleSigninProviderProps } from '.';
import { GoogleOAuthProvider, googleLogout } from '@react-oauth/google';
import { googleSigninConfig } from '../AppUnifiedProvider';

const GoogleSigninProvider = ({ children }: GoogleSigninProviderProps) => {
    return (
        <GoogleOAuthProvider clientId={googleSigninConfig.webClientId}>
            {children}
        </GoogleOAuthProvider>
    );
};

const googleSignOut = googleLogout;
const hasPlayServices = () => new Promise((resolve) => resolve({}));
const signIn = () => new Promise((resolve) => resolve({}));
const getTokens = () => new Promise((resolve) => resolve({}));

export {
    googleSignOut,
    GoogleSigninProvider,
    hasPlayServices,
    signIn,
    getTokens,
};