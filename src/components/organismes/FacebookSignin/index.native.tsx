import { AccessToken, LoginButton, LoginManager } from 'react-native-fbsdk-next';
import { FacebookSigninButtonProps } from '.';
import { cloneElement } from 'react';

const FacebookSigninButton = ({ onSuccess, render }: FacebookSigninButtonProps) => {
    const onPress = async () => {
        let result = null;
        try {
            LoginManager.setLoginBehavior('native_only');
            result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        } catch (nativeError) {
            try {
                LoginManager.setLoginBehavior('web_only');
                result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
            } catch (webError) { }
        }
        if (!result?.isCancelled) {
            try {
                const accessData = await AccessToken.getCurrentAccessToken();
                if (accessData) {
                    onSuccess(accessData.accessToken);
                } else {
                    onSuccess(null);
                }
            } catch (e) {
                onSuccess(null);
            }
        } else {
            onSuccess(null);
        }
    }

    return cloneElement(render, {onPress});
};

const facebookSignOut = LoginManager.logOut;

export {
    FacebookSigninButton,
    facebookSignOut,
};