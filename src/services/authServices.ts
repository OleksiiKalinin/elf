import axios, { errorHandler, pythonAdmin } from './index';
import { Dispatch } from 'react';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
// import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { RegistDataType } from '../screens/AuthScreens/RegistrationScreen';
import generalActions from '../store/actionCreators/general/actions';
import { LoginDataType } from '../screens/AuthScreens/LoginScreen';

const registrate = (formData: RegistDataType) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(generalActions.setAppLoading(true));
        const res = await axios.post(`/api-auth/create/`, formData);
        // console.log(JSON.stringify(res.data, null, 4));
        
        if (res.data) {
            const { access_token, refresh_token } = res.data as { access_token: string | null, refresh_token: string | null };
            await axios.post('/employer/create_user/', {}, { headers: { Authorization: `Bearer ${access_token}` } });
            dispatch(generalActions.setToken({ token: access_token, refresh_token }));
            dispatch(generalActions.setAppLoading(false));
        } else {
            throw Error('error');
        }
    } catch (error: any) {
        await errorHandler(error, dispatch);
    }
};

const login = (formData: LoginDataType) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(generalActions.setAppLoading(true));
        const res = await axios.post(`/api-auth/token/`, {
            ...pythonAdmin, ...formData,
            'grant_type': 'password',
        });
        if (res.data) {
            const { access_token, refresh_token } = res.data as { access_token: string | null, refresh_token: string | null };
            dispatch(generalActions.setToken({ token: access_token, refresh_token }));
            dispatch(generalActions.setAppLoading(false));
        } else {
            throw Error('error');
        }

    } catch (error: any) {
        await errorHandler(error, dispatch);
    }
};

const logout = (token: string | null) => async (dispatch: Dispatch<any>) => {
    await dispatch(generalActions.setAppLoading(true));
    //hack
    await axios.post(`/api-auth/invalidate-sessions/`, pythonAdmin, { headers: { Authorization: `Bearer ${token}` } }).catch(() => {
        dispatch(generalActions.LogOut());
    });
};

const deleteAccount = (token: string | null) => async (dispatch: Dispatch<any>) => {
    await dispatch(generalActions.setAppLoading(true));
    await axios.delete(`/api-auth/delete_account/`, { headers: { Authorization: `Bearer ${token}` } })
    await dispatch(generalActions.LogOut());
};

const resetPassword = (email: string) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(generalActions.setAppLoading(true));
        await axios.post('/api-auth/reset-password/', { ...pythonAdmin, email });
        dispatch(generalActions.setAppLoading(false));
        return true;
    } catch (error: any) {
        await errorHandler(error, dispatch);
        return false;
    }
};

const googleSignin = () => async (dispatch: Dispatch<any>) => {
    // try {
    //     dispatch(generalActions.setAppLoading(true));
    //     await GoogleSignin.hasPlayServices();
    //     await GoogleSignin.signIn();
    //     const { accessToken } = await GoogleSignin.getTokens();
    //     if (accessToken) {
    //         console.log(accessToken);

    //         const res = await axios.post(`/api-auth/convert-token/`, { ...pythonAdmin, grant_type: 'convert_token', token: accessToken, backend: 'google-oauth2' });
    //         const { access_token, refresh_token } = res.data as { access_token: string | null, refresh_token: string | null };
    //         dispatch(generalActions.setToken({ token: access_token, refresh_token }));
    //         dispatch(generalActions.setAppLoading(false));
    //     } else {
    //         throw new Error('');
    //     }
    // } catch (error: any) {
    //     await errorHandler(error, dispatch);
    //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //         // user cancelled the login flow
    //     } else if (error.code === statusCodes.IN_PROGRESS) {
    //         // operation (e.g. sign in) is in progress already
    //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //         // play services not available or outdated
    //     } else {
    //         // some other error happened
    //     }
    // }
};

const facebookSignin = () => async (dispatch: Dispatch<any>) => {
    // dispatch(generalActions.setAppLoading(true));
    // let result = null;
    // try {
    //     LoginManager.setLoginBehavior('native_only');
    //     result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    // } catch (nativeError) {
    //     try {
    //         LoginManager.setLoginBehavior('web_only');
    //         result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    //     } catch (webError) {
    //         // show error message to the user if none of the FB screens
    //         // did not open
    //         console.log('webError: ' + webError);
    //         await errorHandler(webError, dispatch);
    //     }
    // }  // handle the case that users clicks cancel button in Login view
    // if (result?.isCancelled) {

    // } else {
    //     try {
    //         const accessData = await AccessToken.getCurrentAccessToken();
    //         if (accessData) {
    //             console.log(accessData.accessToken);

    //             const res = await axios.post(`/api-auth/convert-token/`, { ...pythonAdmin, grant_type: 'convert_token', token: accessData.accessToken, backend: 'facebook' });
    //             const { access_token, refresh_token } = res.data as { access_token: string | null, refresh_token: string | null };
    //             dispatch(generalActions.setToken({ token: access_token, refresh_token }));
    //             dispatch(generalActions.setAppLoading(false));
    //         } else {
    //             throw new Error('');
    //         }
    //     } catch (error) {
    //         await errorHandler(error, dispatch);
    //     }
    // }
};

export default {
    registrate,
    login,
    logout,
    googleSignin,
    facebookSignin,
    resetPassword,
    deleteAccount,
};