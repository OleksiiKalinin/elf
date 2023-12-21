import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import generalActions from '../store/actionCreators/general/actions';
import { Dispatch } from 'react';
import { Platform } from 'react-native';

export const pythonAdmin = {
    client_id: 'e6nB1kx-rcAEqvMiIsyazg',
    client_secret: 'QWGF9559NvwTCOgIrsS38w'
}

export const baseURL = 'http://91.200.34.126:8000';

const instance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        // 'Platform-Type': Platform.OS,
    }
});

export const errorHandler = async (error: any, dispatch: Dispatch<any>) => {
    // ["config", "request", "response", "isAxiosError", "toJSON", "line", "column", "sourceURL"]
    if (error?.response) {
        console.log(JSON.stringify(error?.response, null, 4));
    } else {
        console.log('js_error: ' + JSON.stringify(error, null, 4));
    }

    if (error?.response?.status === 401) {
        const refresh_token = await AsyncStorage.getItem('refresh_token');

        if (refresh_token) {
            try {
                const res = await instance.post(`/api-auth/token`, {
                    ...pythonAdmin, refresh_token,
                    grant_type: 'refresh_token',
                });

                const { access_token, new_refresh_token } = res.data as { access_token: string | null, new_refresh_token: string | null };
                dispatch(generalActions.setToken({ token: access_token, refresh_token: new_refresh_token }));
            } catch (error: any) {
                console.log(JSON.stringify(error?.response, null, 4));
                dispatch(generalActions.setToken({ token: null, refresh_token: null }));
            }
        }
    }

    dispatch(generalActions.setAppLoading(false));
};

export default instance;