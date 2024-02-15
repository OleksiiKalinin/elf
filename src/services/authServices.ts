import axios, { CustomRequestException, dynamicHeaders, errorHandler, pythonAdmin } from './index';
import { Dispatch } from 'react';
// import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { RegistDataType } from '../screens/AuthScreens/RegistrationScreen';
import generalActions from '../store/actionCreators/general/actions';
import { LoginDataType } from '../screens/AuthScreens/LoginScreen';
import { getTokens, hasPlayServices, signIn } from '../components/organismes/GoogleSignin';
import generalServices from './generalServices';
import { AppDispatch, rootState } from '../store';

const registrate = (formData: RegistDataType) => async (dispatch: AppDispatch, getState: () => rootState) => {
    const { } = getState().general;

    try {
        dispatch(generalActions.setAppLoading(true));
        const res = await axios.post(`/api-auth/create/`, formData);
        // console.log(JSON.stringify(res.data, null, 4));

        if (res.data) {
            const { access_token, refresh_token } = res.data as { access_token: string | null, refresh_token: string | null };
            await axios.post('/employer/create_user/', {}, { headers: dynamicHeaders({ token: access_token }) });
            await dispatch(generalActions.setToken({ token: access_token, refresh_token }));
            await dispatch(generalServices.getAppData(access_token));
        } else {
            throw new (CustomRequestException as any)('unknown error', 400);
        }

        return true;
    } catch (error: any) {
        return await errorHandler({ error, dispatch, getState, caller: registrate.bind(this, formData) });
    }
};

const login = (formData: LoginDataType) => async (dispatch: AppDispatch, getState: () => rootState) => {
    const { } = getState().general;

    try {
        dispatch(generalActions.setAppLoading(true));
        const res = await axios.post(`/api-auth/token/`, {
            ...pythonAdmin, ...formData,
            'grant_type': 'password',
        });
        if (res.data) {
            const { access_token, refresh_token } = res.data as { access_token: string | null, refresh_token: string | null };
            await dispatch(generalActions.setToken({ token: access_token, refresh_token }));
            await dispatch(generalServices.getAppData(access_token));
        } else {
            throw new (CustomRequestException as any)('unknown error', 400);
        }

        return true;
    } catch (error: any) {
        return await errorHandler({ error, dispatch, getState, caller: login.bind(this, formData) });
    }
};

const logout = () => async (dispatch: AppDispatch, getState: () => rootState) => {
    const { token } = getState().general;

    await dispatch(generalActions.setAppLoading(true));
    //hack
    await axios.post(`/api-auth/invalidate-sessions/`, pythonAdmin, { headers: { Authorization: `Bearer ${token}` } }).catch(() => { }).finally(() => {
        dispatch(generalActions.LogOut());
    });
};

const deleteAccount = () => async (dispatch: AppDispatch, getState: () => rootState) => {
    const { token } = getState().general;

    await dispatch(generalActions.setAppLoading(true));
    await axios.delete(`/api-auth/delete_account/`, { headers: { Authorization: `Bearer ${token}` } })
    await dispatch(generalActions.LogOut());
};

const changePassword = (currentPassword: string, newPassword: string) => async (dispatch: AppDispatch, getState: () => rootState) => {
    const { token } = getState().general;
    const data = { current_password: currentPassword, new_password: newPassword };

    try {
        /* dispatch(generalActions.setAppLoading(true)); */
        await axios.post('/api-auth/change-password/', data, { headers: { Authorization: `Bearer ${token}` } });
        /* dispatch(generalActions.setAppLoading(false)); */
        return true;
    } catch (error: any) {
        return await errorHandler({ error, dispatch, getState, caller: changePassword.bind(this, currentPassword, newPassword), ignoreRefreshToken: true });
    }
};

const resetPassword = (email: string) => async (dispatch: AppDispatch, getState: () => rootState) => {
    const { } = getState().general;

    try {
        dispatch(generalActions.setAppLoading(true));
        await axios.post('/api-auth/reset-password/', { ...pythonAdmin, email });
        dispatch(generalActions.setAppLoading(false));
        return true;
    } catch (error: any) {
        return await errorHandler({ error, dispatch, getState, caller: resetPassword.bind(this, email) });
    }
};

const googleSignin = (initialToken?: string) => async (dispatch: AppDispatch, getState: () => rootState) => {
    const { } = getState().general;

    try {
        let token = initialToken;

        dispatch(generalActions.setAppLoading(true));
        if (!token) {
            await hasPlayServices();
            await signIn();
            const { accessToken } = await getTokens();
            token = accessToken;
        }
        if (token) {
            const { data } = await axios.post(`/api-auth/convert-token/`, {
                ...pythonAdmin,
                token,
                grant_type: 'convert_token',
                backend: 'google-oauth2'
            });
            const { access_token, refresh_token } = data as { access_token: string | null, refresh_token: string | null };
            await axios.post('/employer/create_user/', {}, { headers: dynamicHeaders({ token }) }).catch(() => { });
            await dispatch(generalActions.setToken({ token: access_token, refresh_token }));
            await dispatch(generalServices.getAppData(access_token));
        } else {
            throw new (CustomRequestException as any)('no token', 400);
        }

        return true;
    } catch (error: any) {
        return await errorHandler({ error, dispatch, getState, caller: googleSignin.bind(this, initialToken) });
        // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //     // user cancelled the login flow
        // } else if (error.code === statusCodes.IN_PROGRESS) {
        //     // operation (e.g. sign in) is in progress already
        // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        //     // play services not available or outdated
        // } else {
        //     // some other error happened
        // }
    }
};

const facebookSignin = (accessToken: string | null) => async (dispatch: AppDispatch, getState: () => rootState) => {
    const { } = getState().general;

    // dispatch(generalActions.setAppLoading(true));
    try {
        if (accessToken) {
            console.log(accessToken);
            // error status 400
            // "error": "access_denied",
            // "error_description": "Authentication process canceled"

            // const res = await axios.post(`/api-auth/convert-token/`, { ...pythonAdmin, grant_type: 'convert_token', token: accessToken, backend: 'facebook' });
            // const { access_token, refresh_token } = res.data as { access_token: string | null, refresh_token: string | null };
            // dispatch(generalActions.setToken({ token: access_token, refresh_token }));
            // await dispatch(generalServices.getAppData(access_token));
        } else {
            throw new (CustomRequestException as any)('no token', 400);
        }

        return true;
    } catch (error) {
        return await errorHandler({ error, dispatch, getState, caller: facebookSignin.bind(this, accessToken) });
    }
};

export default {
    registrate,
    login,
    logout,
    googleSignin,
    facebookSignin,
    resetPassword,
    deleteAccount,
    changePassword,
};