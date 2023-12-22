import axios, { CustomRequestException, baseURL, dynamicHeaders, errorHandler } from "./index";
import { Dispatch } from "react";
import generalActions from "../store/actionCreators/general/actions";
import { convertToBackEndAddress, convertToFrontEndAddress } from "../hooks/convertAddress";
import { CandidateDataType, NewUserAdvertType, UserAdvertType } from "../store/reducers/types";
import { AppDispatch, rootState } from "../store";

const getUserAdverts = (id: number) => async (dispatch: AppDispatch, getState: () => rootState) => {
    const { token } = getState().general;

    try {
        const res = await axios.get(`/employer/company_job_offers/${id}/`, { headers: dynamicHeaders({ token }) });
        await dispatch(generalActions.setUserAdverts(
            res.data ?
                res.data.map((advert: any) => ({
                    ...advert,
                    location: convertToFrontEndAddress(advert.location)
                }))
                :
                []
        ));

        return true;
    } catch (error: any) {
        return await errorHandler({ error, dispatch, getState, caller: getUserAdverts.bind(this, id) });
    }
};

const getAdvertCandidates = (ids: number[]) => async (dispatch: AppDispatch, getState: () => rootState): Promise<any[]> => {
    const { token } = getState().general;

    try {
        const res = await axios.post(`employer/candidate_info/list_by_ids/`, { ids }, { headers: dynamicHeaders({ token }) });
        return res.data?.length ? res.data.map(({ account, main_photos, video_cv, portfolio, certificates, ...e }: any) => ({
            ...e,
            first_name: account.first_name,
            last_name: account.last_name,
            location: convertToFrontEndAddress(e.location),
            logo: main_photos[0] ? { ...main_photos[0], path: baseURL + main_photos[0].file_location } : null,
            video: video_cv[0] ? { ...video_cv[0], path: baseURL + video_cv[0].file_location } : null,
            photos: portfolio?.length ? (portfolio as any[]).map(({ file_location, ...e }) => ({ ...e, path: baseURL + file_location })) : null,
            certificates: certificates?.length ? (certificates as any[]).map(({ file_location, ...e }) => ({ ...e, path: baseURL + file_location })) : null,
        })) : [];
    } catch (error: any) {
        return await errorHandler({ error, returnDefaulValue: [], dispatch, getState, caller: getAdvertCandidates.bind(this, ids) });
    }
};

const createUserAdvert = (data: NewUserAdvertType) => async (dispatch: AppDispatch, getState: () => rootState) => {
    const { token, userAdverts, userCompany } = getState().general;

    try {
        const res = await axios.post(`/employer/company_job_offers/`, [{
            ...data,
            company_id: userCompany?.id,
            location: convertToBackEndAddress(data.location)
        }], { headers: dynamicHeaders({ token }) });
        await dispatch(generalActions.setUserAdverts([...userAdverts, ...res.data]));
        return true;
    } catch (error: any) {
        return await errorHandler({ error, dispatch, getState, caller: createUserAdvert.bind(this, data) });
    }
};

const updateUserAdvert = (data: NewUserAdvertType) => async (dispatch: AppDispatch, getState: () => rootState) => {
    const { token, userAdverts, userCompany } = getState().general;

    try {
        if (data.id && userCompany?.id) {
            const res = await axios.put(`/employer/company_job_offers/${data.id}/`, [{
                ...data,
                company_id: userCompany.id,
                location: convertToBackEndAddress(data.location)
            }], { headers: dynamicHeaders({ token }) });

            await dispatch(generalActions.setUserAdverts([...userAdverts.filter(e => e.id !== data.id), ...res.data]));
            return true;
        }
        return false;
    } catch (error: any) {
        return await errorHandler({ error, dispatch, getState, caller: updateUserAdvert.bind(this, data) });
    }
};

const createUserInvoice = (data: any) => async (dispatch: AppDispatch, getState: () => rootState) => {
    const { token, userInvoices } = getState().general;

    try {
        const res = await axios.post(`/employer/invoices/`, data, { headers: dynamicHeaders({ token }) });
        await dispatch(generalActions.setUserInvoices([...userInvoices, res.data]));

        return true;
    } catch (error: any) {
        return await errorHandler({ error, dispatch, getState, caller: createUserInvoice.bind(this, data) });
    }
};

const getUserInvoices = () => async (dispatch: AppDispatch, getState: () => rootState) => {
    const { token, userCompany } = getState().general;
    try {
        if (userCompany) {
            const res = await axios.get(`/employer/invoices/${userCompany.id}/`, { headers: dynamicHeaders({ token }) });
            await dispatch(generalActions.setUserInvoices(res.data));
            return true;
        } else {
            throw new (CustomRequestException as any)('user company does not exist');
        }
    } catch (error: any) {
        return await errorHandler({ error, dispatch, getState, caller: getUserInvoices.bind(this) });
    }
};

export default {
    getUserAdverts,
    getAdvertCandidates,
    createUserAdvert,
    updateUserAdvert,
    createUserInvoice,
    getUserInvoices,
}