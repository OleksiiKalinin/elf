import axios, { baseURL, errorHandler } from "./index";
import { Dispatch } from "react";
import generalActions from "../store/actionCreators/general/actions";
import { convertToBackEndAddress, convertToFrontEndAddress } from "../hooks/convertAddress";
import { CandidateDataType, UserAdvertType } from "../store/reducers/types";
import { rootState } from "../store";

const getUserAdverts = (token: string | null, id: number) => async (dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get(`/employer/company_job_offers/${id}/`, { headers: { Authorization: `Bearer ${token}` } });
        dispatch(generalActions.setUserAdverts(
            res.data ?
                res.data.map((advert: any) => ({
                    ...advert,
                    location: convertToFrontEndAddress(advert.location)
                }))
                :
                []
        ));
    } catch (error: any) {
        await errorHandler(error, dispatch);
    }
};

const getAdvertCandidates = (token: string | null, ids: number[]) => async (dispatch: Dispatch<any>): Promise<any[]> => {
    try {
        const res = await axios.post(`employer/candidate_info/list_by_ids/`, { ids }, { headers: { Authorization: `Bearer ${token}` } });
        return res.data?.length ? res.data.map(({account, main_photos, video_cv, portfolio, certificates, ...e}: any) => ({
            ...e,
            first_name: account.first_name,
            last_name: account.last_name,
            location: convertToFrontEndAddress(e.location),
            logo: main_photos[0] ? {...main_photos[0], path: baseURL + main_photos[0].file_location} : null,
            video: video_cv[0] ? {...video_cv[0], path: baseURL + video_cv[0].file_location} : null,
            photos: portfolio?.length ? (portfolio as any[]).map(({file_location, ...e}) => ({...e, path: baseURL + file_location})) : null,
            certificates: certificates?.length ? (certificates as any[]).map(({file_location, ...e}) => ({...e, path: baseURL + file_location})) : null,
        })) : [];
    } catch (error: any) {
        await errorHandler(error, dispatch);
        return [];
    }
};

const createUserAdvert = (data: UserAdvertType, token: string | null, company_id: number, allAdverts: UserAdvertType[]) => async (dispatch: Dispatch<any>) => {
    try {
        const res = await axios.post(`/employer/company_job_offers/`, [{
            ...data,
            company_id,
            location: convertToBackEndAddress(data.location)
        }], { headers: { Authorization: `Bearer ${token}` } });
        await dispatch(generalActions.setUserAdverts([...allAdverts, ...res.data]));
        return true;
    } catch (error: any) {
        await errorHandler(error, dispatch);
        return false;
    }
};

const createUserInvoice = (data: any) => async (dispatch: Dispatch<any>, getState: () => rootState) => {
    try {
        const {token, userInvoices} = getState().general;
        
        const res = await axios.post(`/employer/invoices/`, data, { headers: { Authorization: `Bearer ${token}` } });
        await dispatch(generalActions.setUserInvoices([...userInvoices, res.data]));

        return true;
    } catch (error: any) {
        await errorHandler(error, dispatch);
        return false;
    }
};

const getUserInvoices = () => async (dispatch: Dispatch<any>, getState: () => rootState) => {
    const {token, userCompany} = getState().general;
    try {
        const res = await axios.get(`/employer/invoices/${userCompany?.id}/`, { headers: { Authorization: `Bearer ${token}` } });
        await dispatch(generalActions.setUserInvoices(res.data));
    } catch (error: any) {
        await errorHandler(error, dispatch);
    }
};

export default {
    getUserAdverts,
    getAdvertCandidates,
    createUserAdvert,
    createUserInvoice,
    getUserInvoices,
}