import axios, { errorHandler } from "./index";
import { Dispatch } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import { LoginManager } from "react-native-fbsdk-next";
import generalActions from "../store/actionCreators/general/actions";
import { convertToFrontEndAddress } from "../hooks/convertAddress";
import { AppDispatch } from "../store";

const getAppData = (token: string | null) => async (dispatch: Dispatch<any>) => {
    let isOk = false;
    dispatch(generalActions.setAppLoading(true));

    const [
        [k4, profileHelpScreenDisplayed],
        [k5, isMainMenuFlatList],
    ] = await AsyncStorage.multiGet([
        'profileHelpScreenDisplayed',
        'isMainMenuFlatList',
    ]);
    dispatch(generalActions.setIsMainMenuFlatList(Boolean(Number(isMainMenuFlatList))));
    dispatch(generalActions.setProfileHelpScreenDisplayed(Boolean(profileHelpScreenDisplayed)));
    await Promise.all([
        axios.get('/categorical_data/employer_app_categorical/'),
        ...(token ? [
            axios.get(`/api-auth/currentUser/`, { headers: { Authorization: `Bearer ${token}` } }),
            axios.get(`/employer/companies/`, { headers: { Authorization: `Bearer ${token}` } }),
            axios.get(`/employer/events/`, { headers: { Authorization: `Bearer ${token}` } }),
        ] : [])
    ]).then(async res => {
        const [appData, userData, userCompanyData, userEventsData] = res;

        // console.log(JSON.stringify(appData.data, null, 4));

        // if (userData?.data && !userData?.data?.is_employer) {
        //     await axios.post('/employer/create_user/', {}, { headers: { Authorization: `Bearer ${token}` } });
        //     userData.data.is_employer = true;
        // }

        if (!token) {
            // GoogleSignin.signOut();
            // LoginManager.logOut();
        }

        dispatch(generalActions.setAppData({
            userData: userData?.data || null,
            userCompany: userCompanyData?.data[0] ? {
                ...userCompanyData.data[0],
                main_address: convertToFrontEndAddress(userCompanyData.data[0].main_address),
                other_address: convertToFrontEndAddress(userCompanyData.data[0].other_address),
            } : null,
            userEvents: userEventsData?.data ?
                userEventsData?.data.map((event: any) => ({
                    ...event,
                    location: convertToFrontEndAddress(event.location)
                })) : [],
            jobIndustries: appData.data?.job_industry_and_position || [],
            jobSalaryModes: appData.data?.salary_time_type || [],
            jobSalaryTaxes: appData.data?.salary_tax_type || [],
            jobExperiences: appData.data?.experience || [],
            marksData: appData.data?.notes_candidate_scoring || [],
            notesData: appData.data?.notes_flags1 || [],
        }));
        isOk = true;
    }).catch(error => {
        errorHandler(error, dispatch);
    })
    return isOk;
};

const setUserData = (data: any, token: string | null, protocol: 'post' | 'put') => async (dispatch: Dispatch<any>) => {
    try {
        const res = await axios[protocol](`/api-auth/currentUser/`, data, { headers: { Authorization: `Bearer ${token}` } });
        dispatch(generalActions.setUserData(res.data))
        return true;
    } catch (error: any) {
        await errorHandler(error, dispatch);
        return false;
    }
};

export default {
    getAppData,
    setUserData,
}