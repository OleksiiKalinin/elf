import axios, { baseURL, errorHandler } from "./index";
import { Dispatch } from "react";
import generalActions from "../store/actionCreators/general/actions";
import { CompanyDataType, MediaType, ContactPersonType } from "../store/reducers/types";
import Lodash from 'lodash';
import { convertToBackEndAddress } from "../hooks/convertAddress";

const createUserCompany = (props: {
    companyData: CompanyDataType,
    companyLogo: MediaType | null,
    companyVideo: MediaType | null,
    companyPhotos: MediaType[],
    companyCertificates: MediaType[],
    contactPersons: ContactPersonType[]
}, token: string | null) => async (dispatch: Dispatch<any>) => {
    // try {
    //     const { companyCertificates, companyData, companyLogo, companyVideo, companyPhotos, contactPersons: companyContactPersons } = props;
    //     const newCompany = await axios.post(`/employer/companies/`, [{
    //         ...companyData,
    //         main_address: convertToBackEndAddress(companyData.main_address),
    //         other_address: convertToBackEndAddress(companyData.other_address)
    //     }], { headers: { Authorization: `Bearer ${token}` } });
    //     const company_id = newCompany.data[0]?.id;
    //     if (company_id) {
    //         const companyLogoFormData = new FormData();
    //         const companyVideoFormData = new FormData();
    //         const companyPhotosFormData = new FormData();
    //         const companyCertificatesFormData = new FormData();
    //         let logo: string | null = null;
    //         let video: string | null = null;
    //         let photos: string[] | null = null;
    //         let certificates: string[] | null = null;
    //         let contactPersons: ContactPersonType[] | null = null;

    //         if (companyLogo) {
    //             companyLogoFormData.append("file_location", {
    //                 uri: companyLogo.path,
    //                 name: companyLogo.path.slice(companyLogo.path.lastIndexOf('/') + 1),
    //                 type: companyLogo.mime || 'image/jpeg'
    //             });
    //             companyLogoFormData.append("company_id", company_id);

    //             const res = await axios.post(`/employer/company_logo/`, companyLogoFormData, {
    //                 headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    //                 transformRequest: () => companyLogoFormData
    //             });
                
    //             logo = res.data ? { ...res.data, path: baseURL + res.data.file_location } : null;
    //         }
    //         if (companyVideo) {
    //             companyVideoFormData.append("file_location", {
    //                 uri: companyVideo.path,
    //                 name: companyVideo.path.slice(companyVideo.path.lastIndexOf('/') + 1),
    //                 type: companyVideo.mime || 'video/mp4'
    //             });
    //             companyVideoFormData.append("company_id", company_id);

    //             const res = await axios.post(`/employer/company_video/`, companyVideoFormData, {
    //                 headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    //                 transformRequest: () => companyVideoFormData
    //             });
    //             video = res.data ? { ...res.data, path: baseURL + res.data.file_location } : null;
    //         }
    //         if (companyPhotos.length) {
    //             companyPhotos.forEach(({ path, mime }) => companyPhotosFormData.append("images", {
    //                 uri: path,
    //                 name: path.slice(path.lastIndexOf('/') + 1),
    //                 type: mime || 'image/jpeg'
    //             }));
    //             companyPhotosFormData.append("order_list", JSON.stringify(Array(companyPhotos.length).fill(0).map((_, i) => i)));
    //             companyPhotosFormData.append("company_id", company_id);

    //             const res = await axios.post(`/employer/company_photos/`, companyPhotosFormData, {
    //                 headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    //                 transformRequest: () => companyPhotosFormData
    //             });
    //             photos = res.data?.map(({ images, ...el }: any) => ({ ...el, path: baseURL + images })) || null;
    //         }
    //         if (companyCertificates.length) {
    //             companyCertificates.forEach(file => companyCertificatesFormData.append("images", {
    //                 uri: file.path,
    //                 name: file.path.slice(file.path.lastIndexOf('/') + 1),
    //                 type: file.mime || 'image/jpeg'
    //             }));
    //             companyCertificatesFormData.append("company_id", company_id);
    //             const res = await axios.post(`/employer/company_certificates/`, companyCertificatesFormData, {
    //                 headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    //                 transformRequest: () => companyCertificatesFormData
    //             });
    //             certificates = res.data?.map(({ images, ...el }: any) => ({ ...el, path: baseURL + images })) || null;
    //         }
    //         if (companyContactPersons.length) {
    //             const res = await axios.post(`/employer/company_contact_persons/`, companyContactPersons.map(({ id, ...el }) => ({ ...el, company_id })), { headers: { Authorization: `Bearer ${token}` } });
    //             contactPersons = res.data || null;
    //         }
            
    //         await dispatch(generalActions.setUserCompany({ ...newCompany.data[0], logo, video, photos, certificates, contactPersons }));
    //     }
    //     return true;
    // } catch (error: any) {
    //     await errorHandler(error, dispatch);
    //     return false;
    // }
};

const editUserCompany = (props: {
    oldCompanyData: CompanyDataType,
    companyData: CompanyDataType,
    companyLogo: MediaType | null,
    companyVideo: MediaType | null,
    companyPhotos: MediaType[],
    companyCertificates: MediaType[],
    contactPersons: ContactPersonType[]
}, token: string | null) => async (dispatch: Dispatch<any>) => {
    // try {
    //     let { companyCertificates, companyData: newCompanyData, oldCompanyData, companyLogo, companyVideo, companyPhotos, contactPersons: companyContactPersons } = props;
    //     if (oldCompanyData.id) {
    //         {
    //             const { photos, certificates, id, logo, contactPersons, ...newMainCompanyData } = newCompanyData;
    //             const { photos: _, certificates: _1, id: _2, logo: _3, contactPersons: _4, ...oldMainCompanyData } = oldCompanyData;
    //             if (!Lodash.isEqual(oldMainCompanyData, newMainCompanyData)) {
    //                 const res = await axios.put(`/employer/companies/${id}/`, {
    //                     ...newMainCompanyData,
    //                     main_address: convertToBackEndAddress(newMainCompanyData.main_address),
    //                     other_address: convertToBackEndAddress(newMainCompanyData.other_address),
    //                 }, { headers: { Authorization: `Bearer ${token}` } });
    //                 if (res.data) newCompanyData = { ...newCompanyData, ...res.data };
    //             }
    //         }
    //         if (!Lodash.isEqual(oldCompanyData.logo, companyLogo)) {
    //             const companyLogoFormData = new FormData();
    //             companyLogoFormData.append("file_location", {
    //                 uri: companyLogo?.path,
    //                 name: companyLogo?.path.slice(companyLogo?.path.lastIndexOf('/') + 1),
    //                 type: companyLogo?.mime || 'image/jpeg'
    //             });
    //             companyLogoFormData.append("company_id", newCompanyData.id);

    //             let resLogo = null;
    //             if (!oldCompanyData.logo && !!companyLogo) {
    //                 const { data } = await axios.post(`/employer/company_logo/`, companyLogoFormData, {
    //                     headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    //                     transformRequest: () => companyLogoFormData
    //                 });
    //                 resLogo = data;
    //             } else if (!!oldCompanyData.logo && !!companyLogo) {
    //                 const { data } = await axios.put(`/employer/company_logo/${oldCompanyData.logo?.id}/`, companyLogoFormData, {
    //                     headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    //                     transformRequest: () => companyLogoFormData
    //                 });
    //                 resLogo = data;
    //             } else {
    //                 await axios.delete(`/employer/company_logo/${oldCompanyData.logo?.id}/`, { headers: { Authorization: `Bearer ${token}` } }).catch(() => { });
    //             }
    //             newCompanyData.logo = resLogo ? { ...resLogo, path: baseURL + resLogo.file_location } : null;
    //         }
    //         if (!Lodash.isEqual(oldCompanyData.video, companyVideo)) {
    //             const companyVideoFormData = new FormData();
    //             companyVideoFormData.append("file_location", {
    //                 uri: companyVideo?.path,
    //                 name: companyVideo?.path.slice(companyVideo?.path.lastIndexOf('/') + 1),
    //                 type: companyVideo?.mime || 'video/mp4'
    //             });
    //             companyVideoFormData.append("company_id", newCompanyData.id);

    //             let resVideo = null;
    //             if (!oldCompanyData.video && !!companyVideo) {
    //                 const { data } = await axios.post(`/employer/company_video/`, companyVideoFormData, {
    //                     headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    //                     transformRequest: () => companyVideoFormData
    //                 });
    //                 resVideo = data;
    //             } else if (!!oldCompanyData.video && !!companyVideo) {
    //                 const { data } = await axios.put(`/employer/company_video/${oldCompanyData.video?.id}/`, companyVideoFormData, {
    //                     headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    //                     transformRequest: () => companyVideoFormData
    //                 });
    //                 resVideo = data;
    //             } else {
    //                 await axios.delete(`/employer/company_video/${oldCompanyData.video?.id}/`, { headers: { Authorization: `Bearer ${token}` } }).catch(() => { });
    //             }
    //             newCompanyData.video = resVideo ? { ...resVideo, path: baseURL + resVideo.file_location } : null;
    //         }

    //         if (!Lodash.isEqual(oldCompanyData.photos, companyPhotos)) {
    //             const companyPhotosFormData = new FormData();
    //             const forPushArray = companyPhotos.reduce<MediaType[]>((prev, curr, order) => {
    //                 if (!curr.id) return [...prev, Object.assign({ order }, curr)];
    //                 else return prev;
    //             }, []);
    //             const forDeleteArray = oldCompanyData.photos?.reduce<number[]>((prev, curr) => {
    //                 if (curr.id && !companyPhotos.find(el => el.id === curr.id)) return [...prev, curr.id];
    //                 else return prev;
    //             }, []) || [];
    //             const orderData = companyPhotos.reduce<{ id: number, order: number }[]>((prev, { id }, order) => id ? [...prev, { id, order }] : prev, []);

    //             forPushArray.forEach(({ path, mime }) => {
    //                 companyPhotosFormData.append("images", {
    //                     uri: path,
    //                     name: path.slice(path.lastIndexOf('/') + 1),
    //                     type: mime || 'image/jpeg',
    //                 });
    //             });
    //             companyPhotosFormData.append("order_list", JSON.stringify(forPushArray.map(({ order }) => order)));
    //             companyPhotosFormData.append("company_id", oldCompanyData.id);

    //             await Promise.all([
    //                 ...(forPushArray.length ? [axios.post(`/employer/company_photos/`, companyPhotosFormData, {
    //                     headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    //                     transformRequest: () => companyPhotosFormData
    //                 })] : []),
    //                 ...(forDeleteArray.map(id =>
    //                     axios.delete(`/employer/company_photos/${id}/`, { headers: { Authorization: `Bearer ${token}` } }).catch(() => { })
    //                 )),
    //                 ...(orderData.length ? [axios.post(`/employer/company_photos/${oldCompanyData.id}/order/`, orderData, { headers: { Authorization: `Bearer ${token}` } })] : []),
    //             ]).then(async () => {
    //                 newCompanyData.photos = await getUserCompanyPhotos(oldCompanyData.id as number, token)(dispatch);
    //             })
    //         }

    //         /*/////////////!!!!!!!!!!!!!!!!!!!
    //         edit certificates and contact persons
    //         //////////////!!!!!!!!!!!!!!!!!!!*/

    //         await dispatch(generalActions.setUserCompany(newCompanyData));
    //     }
    //     return true;
    // } catch (error: any) {
    //     await errorHandler(error, dispatch);
    //     return false;
    // }
};

const deleteUserCompany = (id: number, token: string | null) => async (dispatch: Dispatch<any>) => {
    try {
        await axios.delete(`/employer/companies/${id}/`, { headers: { Authorization: `Bearer ${token}` } }).catch(() => { });
        await dispatch(generalActions.setUserCompany(null));
        return true;
    } catch (error: any) {
        await errorHandler(error, dispatch);
        return false;
    }
};

const getUserCompanyLogo = (id: number, token: string | null) => async (dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get(`/employer/company_logo/${id}/`, { headers: { Authorization: `Bearer ${token}` } });
        return res.data[0] ? { ...res.data[0], path: baseURL + res.data[0].file_location } : null;
    } catch (error: any) {
        await errorHandler(error, dispatch);
        return null;
    }
};

const getUserCompanyVideo = (id: number, token: string | null) => async (dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get(`/employer/company_video/${id}/`, { headers: { Authorization: `Bearer ${token}` } });
        return res.data[0] ? { ...res.data[0], path: baseURL + res.data[0].file_location } : null;
    } catch (error: any) {
        await errorHandler(error, dispatch);
        return null;
    }
};

const getUserCompanyPhotos = (id: number, token: string | null) => async (dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get(`/employer/company_photos/${id}/`, { headers: { Authorization: `Bearer ${token}` } });
        return res.data?.map(({ images, ...el }: any) => ({ ...el, path: baseURL + images })) || null;
    } catch (error: any) {
        await errorHandler(error, dispatch);
        return null;
    }
};

const getUserCompanyCertificates = (id: number, token: string | null) => async (dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get(`/employer/company_certificates/${id}/`, { headers: { Authorization: `Bearer ${token}` } });
        return res.data?.map(({ images, ...el }: any) => ({ ...el, path: baseURL + images })) || null;
    } catch (error: any) {
        await errorHandler(error, dispatch);
        return null;
    }
};

const getUserCompanyContactPersons = (id: number, token: string | null) => async (dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get(`/employer/company_contact_persons/${id}/`, { headers: { Authorization: `Bearer ${token}` } });
        return res.data;
    } catch (error: any) {
        await errorHandler(error, dispatch);
        return null;
    }
};

export default {
    createUserCompany,
    editUserCompany,
    getUserCompanyLogo,
    getUserCompanyVideo,
    getUserCompanyPhotos,
    getUserCompanyCertificates,
    getUserCompanyContactPersons,
    deleteUserCompany,
}