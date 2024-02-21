import axios, { CustomRequestException, dynamicHeaders, errorHandler } from "./index";
import { Dispatch } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import generalActions from "../store/actionCreators/general/actions";
import { convertToFrontEndAddress } from "../hooks/convertAddress";
import { googleSignOut } from "../components/organismes/GoogleSignin";
import { facebookSignOut } from "../components/organismes/FacebookSignin";
import { AppDispatch, rootState } from "../store";
import advertsServices from "./advertsServices";
import { AxiosResponse } from "axios";
import { generalReducerState } from "../store/reducers/types";

export const getAllSettledValue = (promise: PromiseSettledResult<AxiosResponse<any, any>> | undefined): any | undefined => {
    if (promise?.status === 'fulfilled') return promise.value?.data;
    if (promise?.reason?.response?.status === 401) throw new (CustomRequestException as any)('refresh', 401);
    if (promise?.reason?.response?.status >= 500) throw new (CustomRequestException as any)('error unknown', 500);
    return undefined;
}

const getAppData = (token: generalReducerState['token']) => async (dispatch: AppDispatch, getState: () => rootState) => {
    const { } = getState().general;

    let isOk = false;

    dispatch(generalActions.setAppLoading(true));

    const [
        [, profileHelpScreenDisplayed],
        [, isMainMenuFlatList],
    ] = await AsyncStorage.multiGet([
        'profileHelpScreenDisplayed',
        'isMainMenuFlatList',
    ]);
    dispatch(generalActions.setIsMainMenuFlatList(Boolean(Number(isMainMenuFlatList))));
    dispatch(generalActions.setProfileHelpScreenDisplayed(Boolean(profileHelpScreenDisplayed)));

    await Promise.allSettled([
        axios.get('/categorical_data/employer_app_categorical/'),
        ...(token ? [
            axios.get(`/api-auth/currentUser/`, { headers: dynamicHeaders({ token }) }),
            axios.get(`/employer/companies/`, { headers: dynamicHeaders({ token }) }),
            axios.get(`/employer/events/`, { headers: dynamicHeaders({ token }) }),
            // axios.get(`/employer/cookies_notifications/`, { headers: dynamicHeaders({ token }) }),
        ] : [])
    ]).then(async res => {
        const [appData, userData, userCompanyData, userEventsData,
            // settings
        ] = res.map(p => getAllSettledValue(p));

        // console.log(JSON.stringify(appData.data, null, 4));

        // if (userData?.data && !userData?.data?.is_employer) {
        //     await axios.post('/employer/create_user/', {}, { headers: dynamicHeaders({token}) });
        //     userData.data.is_employer = true;
        // }
        if (!token) {
            googleSignOut();
            facebookSignOut();
        }

        if (userCompanyData && userCompanyData[0]?.id) {
            await dispatch(advertsServices.getUserAdverts(userCompanyData[0].id));
        }

        await dispatch(generalActions.setAppData({
            userData: userData || null,
            userCompany: userCompanyData && userCompanyData[0] ? {
                ...userCompanyData[0],
                address: convertToFrontEndAddress(userCompanyData[0].address),
            } : null,
            userEvents: userEventsData?.map((event: any) => ({
                ...event,
                location: convertToFrontEndAddress(event.location)
            })) || [],
            jobIndustries: appData?.job_industry_and_position || [],
            jobModes: appData?.job_mode || [],
            jobContractTypes: appData?.type_of_contract || [],
            jobTrials: appData?.trial_type || [],
            jobTrialTimes: appData?.trial_time || [],
            jobStartFrom: appData?.job_start || [],
            jobSalaryModes: appData?.salary_time_type || [],
            jobSalaryTaxes: appData?.salary_tax_type || [],
            jobExperiences: appData?.experience || [],
            languages: appData?.languages || [],
            services: appData?.services || [],
            cookieConsents: appData?.CookieConsent || [],
            notificationConsents: appData?.notification || [],
            employeesAmount: appData?.employees_amount || [],
            marksData: appData?.notes_candidate_scoring || [],
            notesData: appData?.notes_flags1 || [],
            userQuestions: [],
            candidatesFilters: null,
            appLoading: false,
            userSettings: {
                notifications: [],
                cookies: [],
            }
            // userSettings: {
            //     notifications: settings.notifications || (AsyncStorage.getItem('notifications') || [appData?.notification]),
            //     cookies: settings.cookie_consents || (AsyncStorage.getItem('cookies') || [1]),
            // }
        }));
        isOk = true;
        console.log(appData)
    }).catch(async error => {
        await errorHandler({ error, dispatch, getState, caller: (token) => getAppData(token) });
    })
    dispatch(generalActions.setAppLoading(false));

    return isOk;
};

const setUserData = (data: any, protocol: 'post' | 'put') => async (dispatch: AppDispatch, getState: () => rootState) => {
    const { token } = getState().general;
    try {
        const res = await axios[protocol](`/api-auth/currentUser/`, data, { headers: dynamicHeaders({ token }) });
        dispatch(generalActions.setUserData(res.data))
        return true;
    } catch (error: any) {
        await errorHandler({ error, dispatch, getState, caller: setUserData.bind(this, data, protocol) });
        return false;
    }
};

const setUserSettings = (data: any) => async (dispatch: AppDispatch, getState: () => rootState) => {
    const { token } = getState().general;
    try {
        const res = await axios.post(`/employer/cookies_notifications/`, data, { headers: dynamicHeaders({ token }) });
        dispatch(generalActions.setUserSettings({
            cookies: res.data.cookie_consents,
            notifications: res.data.notifications,
        }));
        return true;
    } catch (error: any) {
        await errorHandler({ error, dispatch, getState, caller: setUserSettings.bind(this, data) });
        return false;
    };
};

const getUserSettings = () => async (dispatch: AppDispatch, getState: () => rootState) => {
    const { token } = getState().general;
    try {
        const res = await axios.get(`/employer/cookies_notifications/`, { headers: dynamicHeaders({ token }) });
        return res.data;
    } catch (error: any) {
        return await errorHandler({ error, returnDefaulValue: null, dispatch, getState, caller: getUserSettings.bind(this) });
    };
};

export default {
    getAppData,
    setUserData,
    setUserSettings,
    getUserSettings
}