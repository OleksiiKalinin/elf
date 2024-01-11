import axios, { AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import generalActions from '../store/actionCreators/general/actions';
import { AppDispatch, rootState } from '../store';
import { generalReducerState } from '../store/reducers/types';
import windowExists from '../hooks/windowExists';
import { Alert, Platform } from 'react-native';
import fatalErrorMessage from '../../fatalErrorMessage';
import { isArray } from 'lodash';

export const pythonAdmin = {
    client_id: 'e6nB1kx-rcAEqvMiIsyazg',
    client_secret: 'QWGF9559NvwTCOgIrsS38w'
}

export const baseURL = 'http://91.200.34.126:8000';

const instance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const dynamicHeaders = ({ token }: { token?: generalReducerState['token'] }): AxiosRequestConfig<any>['headers'] => {
    return {
        ...(!!token ? { Authorization: `Bearer ${token}` } : {}),
    }
}

export function CustomRequestException(this: any, message: string, status?: number) {
    this.response = {};
    this.response.message = message;
    this.response.status = status;
}

// bug with refresh token
let accessToRefreshToken = true;

export const errorHandler = async (props: {
    error: any,
    dispatch: AppDispatch,
    getState: () => rootState,
    caller?: (token: string) => any,
    ignoreRefreshToken?: boolean,
    invisibleError?: boolean,
    invisibleFatalError?: boolean,
    returnDefaulValue?: any,
}) => {
    const {
        dispatch, error, getState, caller,
        ignoreRefreshToken = false,
        invisibleError = false,
        invisibleFatalError = false,
        returnDefaulValue = false
    } = props;
    const { refresh_token } = getState().general;
    const response = error?.response;
    let showError = true;

    console.log(JSON.stringify(error, null, 4))
    if (response) {
        console.log(JSON.stringify(response, null, 4));
    } else {
        console.log('js_error: ' + JSON.stringify(error, null, 4));
    }

    if (!ignoreRefreshToken && response?.status === 401) {
        if (refresh_token) {
            if (accessToRefreshToken) {
                accessToRefreshToken = false;
                setTimeout(() => {
                    accessToRefreshToken = true;
                }, 10000);

                try {
                    const { data } = await instance.post(`/api-auth/token`, {
                        ...pythonAdmin, refresh_token,
                        grant_type: 'refresh_token',
                    });

                    const { access_token: new_access_token, refresh_token: new_refresh_token } = data;
                    if (new_access_token && new_refresh_token) {
                        await dispatch(generalActions.setToken({ token: new_access_token, refresh_token: new_refresh_token }));
                        if (caller) {
                            const res = await dispatch(caller(new_access_token));
                            return res;
                        }
                    }
                } catch (error: any) {
                    await dispatch(generalActions.setToken({ token: null, refresh_token: null }));
                }
            } else {
                await dispatch(generalActions.setToken({ token: null, refresh_token: null }));
                if (Platform.OS === 'web' && windowExists()) {
                    window.location.reload();
                }
            }
        } else {
            await dispatch(generalActions.setToken({ token: null, refresh_token: null }));
        }
    } else if (response?.status === 500 && !invisibleFatalError) {
        Alert.alert(fatalErrorMessage['pl']);
        await dispatch(generalActions.resetStore());
        return false;
    }

    if (showError && !(invisibleError || invisibleFatalError)) {
        const details = response?.data;
        let message = fatalErrorMessage['pl'];
        if (details) {
            if (typeof details === 'object') {
                if (details.messages?.length) {
                    message = details.messages.map((e: any) => e?.message || '').join('\n') || message;
                } else {
                    message = Object.keys(details).map(key => key !== 'code' ? isArray(details[key]) ? (details[key][0] || message) : details[key] : '').join('\n') || message;
                }
            } else if (typeof details === 'string' && !details.match(/<!DOCTYPE html>/gmi)) {
                message = details;
            }
        }
        await dispatch(generalActions.setError(message));
        return returnDefaulValue;
    }
    return true;
};

export default instance;