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
        ] : [])
    ]).then(async res => {
        const [appData, userData, userCompanyData, userEventsData] = res.map(p => getAllSettledValue(p));

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
                main_address: convertToFrontEndAddress(userCompanyData[0].main_address),
                other_address: convertToFrontEndAddress(userCompanyData[0].other_address),
            } : null,
            userEvents: userEventsData?.map((event: any) => ({
                ...event,
                location: convertToFrontEndAddress(event.location)
            })),
            jobIndustries: appData?.job_industry_and_position || [],
            jobSalaryModes: appData?.salary_time_type || [],
            jobSalaryTaxes: appData?.salary_tax_type || [],
            jobExperiences: appData?.experience || [],
            marksData: appData?.notes_candidate_scoring || [],
            notesData: appData?.notes_flags1 || [],
            userQuestions: [],
            candidatesFilters: null,
            appLoading: false,
        }));
        isOk = true;
    }).catch(async error => {
        await errorHandler({ error, dispatch, getState, caller: (token) => getAppData(token) });
    })
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

export default {
    getAppData,
    setUserData,
}