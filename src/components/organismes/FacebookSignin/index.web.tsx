import { FacebookSigninButtonProps } from '.';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import windowExists from '../../../hooks/windowExists';
import { cloneElement } from 'react';

const FacebookSigninButton = ({ onSuccess, render }: FacebookSigninButtonProps) => {
    
    return <FacebookLogin
        appId="785183549640910"
        callback={(response: any) => {
            if (response?.accessToken) onSuccess(response.accessToken)
            else onSuccess(null);
        }}
        render={({onClick}) => cloneElement(render, {onPress: onClick})}
    />;
};

let facebookSignOut = () => { };

if (windowExists() && !!(window as any).FB?.logout) {
    facebookSignOut = (window as any).FB.logout;
}

export {
    FacebookSigninButton,
    facebookSignOut,
};