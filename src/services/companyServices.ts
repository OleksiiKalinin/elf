import axios, { baseURL, dynamicHeaders, errorHandler } from "./index";
import { Dispatch } from "react";
import generalActions from "../store/actionCreators/general/actions";
import { CompanyDataType, MediaType, ContactPersonType, OtherCompanyLocationType } from "../store/reducers/types";
import Lodash from 'lodash';
import { convertToBackEndAddress, convertToFrontEndAddress } from "../hooks/convertAddress";
import { AppDispatch, rootState } from "../store";
import { Platform } from "react-native";
import base64ToBlob from "../hooks/base64ToBlob";
import { convertToBackEndCompanyOtherLocations, convertToFrontEndCompanyOtherLocations } from "../hooks/convertCompanyOtherLocations";

const createUserCompany = (props: {
  companyData: CompanyDataType,
  companyLogo: MediaType | null,
  // companyVideo: MediaType | null,
  companyPhotos: MediaType[],
  companyCertificates: MediaType[],
  contactPersons: ContactPersonType[],
  companyOtherLocations: OtherCompanyLocationType[],
}) => async (dispatch: AppDispatch, getState: () => rootState) => {
  const { token } = getState().general;
  try {
    const { companyCertificates, companyData, companyLogo, /* companyVideo,  */companyPhotos, contactPersons: companyContactPersons, companyOtherLocations: otherLocations } = props;
    const newCompany = await axios.post(`/employer/companies/`, [{
      ...companyData,
      address: convertToBackEndAddress(companyData.address)
    }], { headers: dynamicHeaders({ token }) });
    const company_id = newCompany.data[0]?.id;
    if (company_id) {
      const companyLogoFormData = new FormData();
      // const companyVideoFormData = new FormData();
      const companyPhotosFormData = new FormData();
      const companyCertificatesFormData = new FormData();
      let logo: string | null = null;
      let video: string | null = null;
      let photos: string[] | null = null;
      let certificates: string[] | null = null;
      let contactPersons: ContactPersonType[] | null = null;
      let other_locations: OtherCompanyLocationType[] | null = null;

      if (companyLogo) {
        if (Platform.OS === 'web' && companyLogo?.path) {
          companyLogoFormData.append("file_location", base64ToBlob(companyLogo.path));
        } else {
          // @ts-ignore
          companyLogoFormData.append("file_location", {
            uri: companyLogo?.path,
            name: companyLogo?.path.slice(companyLogo?.path.lastIndexOf('/') + 1),
            type: companyLogo?.mime || 'image/jpeg'
          });
        }
        companyLogoFormData.append("company_id", company_id);

        const res = await axios.post(`/employer/company_logo/`, companyLogoFormData, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
          transformRequest: () => companyLogoFormData
        });

        logo = res.data ? { ...res.data, path: baseURL + res.data.file_location } : null;
      }
      // if (companyVideo) {
      //     companyVideoFormData.append("file_location", {
      //         uri: companyVideo.path,
      //         name: companyVideo.path.slice(companyVideo.path.lastIndexOf('/') + 1),
      //         type: companyVideo.mime || 'video/mp4'
      //     });
      //     companyVideoFormData.append("company_id", company_id);

      //     const res = await axios.post(`/employer/company_video/`, companyVideoFormData, {
      //         headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      //         transformRequest: () => companyVideoFormData
      //     });
      //     video = res.data ? { ...res.data, path: baseURL + res.data.file_location } : null;
      // }
      if (companyPhotos.length) {
        companyPhotos.forEach(({ path, mime }) => {
          if (Platform.OS === 'web') {
            companyPhotosFormData.append("images", base64ToBlob(path));
          } else {
            // @ts-ignore
            companyPhotosFormData.append("images", {
              uri: path,
              name: path.slice(path.lastIndexOf('/') + 1),
              type: mime || 'image/jpeg'
            });
          }
        });
        companyPhotosFormData.append("order_list", JSON.stringify(Array(companyPhotos.length).fill(0).map((_, i) => i)));
        companyPhotosFormData.append("company_id", company_id);

        const res = await axios.post(`/employer/company_photos/`, companyPhotosFormData, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
          transformRequest: () => companyPhotosFormData
        });
        photos = res.data?.map(({ images, ...el }: any) => ({ ...el, path: baseURL + images })) || null;
      }
      if (companyCertificates.length) {
        companyCertificates.forEach(({ path, mime }) => {
          if (Platform.OS === 'web') {
            companyCertificatesFormData.append("file_location", base64ToBlob(path));
          } else {
            // @ts-ignore
            companyCertificatesFormData.append("file_location", {
              uri: path,
              name: path.slice(path.lastIndexOf('/') + 1),
              type: mime || 'image/jpeg'
            });
          }
        });
        companyCertificatesFormData.append("order_list", JSON.stringify(Array(companyCertificates.length).fill(0).map((_, i) => i)));
        companyCertificatesFormData.append("company_id", company_id);

        const res = await axios.post(`/employer/company_certificates/`, companyCertificatesFormData, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
          transformRequest: () => companyCertificatesFormData
        });
        certificates = res.data?.map(({ file_location, ...el }: any) => ({ ...el, path: baseURL + file_location })) || null;
      }
      if (companyContactPersons.length) {
        const res = await axios.post(`/employer/company_contact_persons/`, companyContactPersons.map(({ id, ...el }) => ({ ...el, company_id })), { headers: dynamicHeaders({ token }) });
        contactPersons = res.data || null;
      }

      if (otherLocations.length && contactPersons) {
        const getContactPersons = await dispatch(getUserCompanyContactPersons(company_id as number));
        console.log('contactPersons', contactPersons);

        const convertedOtherLocations = convertToBackEndCompanyOtherLocations(otherLocations, contactPersons, getContactPersons, company_id);

        await axios.post(`/employer/other_locations/`, convertedOtherLocations.map(({ id, ...el }) => ({ ...el, company_id })), { headers: dynamicHeaders({ token }) }
        ).then(async (res) => {
          const getContactPersons = await dispatch(getUserCompanyContactPersons(company_id));
          contactPersons = getContactPersons;
          other_locations = convertToFrontEndCompanyOtherLocations(res.data, getContactPersons);
        })
      };

      console.log(newCompany.data[0]);

      await dispatch(generalActions.setUserCompany({ ...newCompany.data[0], address: convertToFrontEndAddress(newCompany.data[0].address), logo, video, photos, certificates, contactPersons, other_locations }));
    }
    return true;
  } catch (error: any) {
    return await errorHandler({ error, dispatch, getState, caller: createUserCompany.bind(this, props) });
  }
};

const editUserCompany = (props: {
  oldCompanyData: CompanyDataType,
  companyData: CompanyDataType,
  companyLogo: MediaType | null,
  // companyVideo: MediaType | null,
  companyPhotos: MediaType[],
  companyCertificates: MediaType[],
  contactPersons: ContactPersonType[],
  companyOtherLocations: OtherCompanyLocationType[],
}) => async (dispatch: AppDispatch, getState: () => rootState) => {
  const { token } = getState().general;
  try {
    let { companyCertificates, companyData: newCompanyData, oldCompanyData, companyLogo, /* companyVideo, */ companyPhotos, contactPersons: companyContactPersons, companyOtherLocations: otherLocations } = props;
    if (oldCompanyData.id) {
      {
        const { photos, certificates, id, logo, contactPersons, ...newMainCompanyData } = newCompanyData;
        const { photos: _, certificates: _1, id: _2, logo: _3, contactPersons: _4, ...oldMainCompanyData } = oldCompanyData;
        if (!Lodash.isEqual(oldMainCompanyData, newMainCompanyData)) {
          const res = await axios.put(`/employer/companies/${id}/`, {
            ...newMainCompanyData,
            address: convertToBackEndAddress(newMainCompanyData.address),
          }, { headers: dynamicHeaders({ token }) });
          if (res.data) newCompanyData = { ...newCompanyData, ...res.data };
        }
      }
      if (!Lodash.isEqual(oldCompanyData.logo, companyLogo)) {
        const companyLogoFormData = new FormData();
        if (Platform.OS === 'web' && companyLogo?.path) {
          companyLogoFormData.append("file_location", base64ToBlob(companyLogo.path));
        } else {
          // @ts-ignore
          companyLogoFormData.append("file_location", {
            uri: companyLogo?.path,
            name: companyLogo?.path.slice(companyLogo?.path.lastIndexOf('/') + 1),
            type: companyLogo?.mime || 'image/jpeg'
          });
        }
        // @ts-ignore
        companyLogoFormData.append("company_id", newCompanyData.id);

        console.log(companyLogoFormData);

        let resLogo = null;
        if (!oldCompanyData.logo && !!companyLogo) {
          const { data } = await axios.post(`/employer/company_logo/`, companyLogoFormData, {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
            transformRequest: () => companyLogoFormData
          });
          resLogo = data;
        } else if (!!oldCompanyData.logo && !!companyLogo) {
          const { data } = await axios.put(`/employer/company_logo/${oldCompanyData.logo?.id}/`, companyLogoFormData, {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
            transformRequest: () => companyLogoFormData
          });
          resLogo = data;
        } else {
          await axios.delete(`/employer/company_logo/${oldCompanyData.logo?.id}/`, { headers: dynamicHeaders({ token }) }).catch(() => { });
        }
        newCompanyData.logo = resLogo ? { ...resLogo, path: baseURL + resLogo.file_location } : null;
      }
      // if (!Lodash.isEqual(oldCompanyData.video, companyVideo)) {
      //     const companyVideoFormData = new FormData();
      //     companyVideoFormData.append("file_location", {
      //         uri: companyVideo?.path,
      //         name: companyVideo?.path.slice(companyVideo?.path.lastIndexOf('/') + 1),
      //         type: companyVideo?.mime || 'video/mp4'
      //     });
      //     companyVideoFormData.append("company_id", newCompanyData.id);

      //     let resVideo = null;
      //     if (!oldCompanyData.video && !!companyVideo) {
      //         const { data } = await axios.post(`/employer/company_video/`, companyVideoFormData, {
      //             headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      //             transformRequest: () => companyVideoFormData
      //         });
      //         resVideo = data;
      //     } else if (!!oldCompanyData.video && !!companyVideo) {
      //         const { data } = await axios.put(`/employer/company_video/${oldCompanyData.video?.id}/`, companyVideoFormData, {
      //             headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      //             transformRequest: () => companyVideoFormData
      //         });
      //         resVideo = data;
      //     } else {
      //         await axios.delete(`/employer/company_video/${oldCompanyData.video?.id}/`, { headers: dynamicHeaders({ token }) }).catch(() => { });
      //     }
      //     newCompanyData.video = resVideo ? { ...resVideo, path: baseURL + resVideo.file_location } : null;
      // }

      if (!Lodash.isEqual(oldCompanyData.photos, companyPhotos)) {
        const companyPhotosFormData = new FormData();
        const forPushArray = companyPhotos.reduce<MediaType[]>((prev, curr, order) => {
          if (!curr.id) return [...prev, Object.assign({ order }, curr)];
          else return prev;
        }, []);
        const forDeleteArray = oldCompanyData.photos?.reduce<number[]>((prev, curr) => {
          if (curr.id && !companyPhotos.find(el => el.id === curr.id)) return [...prev, curr.id];
          else return prev;
        }, []) || [];
        const orderData = companyPhotos.reduce<{ id: number, order: number }[]>((prev, { id }, order) => id ? [...prev, { id, order }] : prev, []);

        forPushArray.forEach(({ path, mime }) => {
          if (Platform.OS === 'web' && path) {
            companyPhotosFormData.append("images", base64ToBlob(path));
          } else {
            // @ts-ignore
            companyPhotosFormData.append("images", {
              uri: path,
              name: path.slice(path.lastIndexOf('/') + 1),
              type: mime || 'image/jpeg'
            });
          }
        })

        companyPhotosFormData.append("order_list", JSON.stringify(forPushArray.map(({ order }) => order)));
        // @ts-ignore
        companyPhotosFormData.append("company_id", oldCompanyData.id);

        await Promise.all([
          ...(forPushArray.length ? [axios.post(`/employer/company_photos/`, companyPhotosFormData, {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
            transformRequest: () => companyPhotosFormData
          })] : []),
          ...(forDeleteArray.map(id =>
            axios.delete(`/employer/company_photos/${id}/`, { headers: dynamicHeaders({ token }) }).catch(() => { })
          )),
          ...(orderData.length ? [axios.post(`/employer/company_photos/${oldCompanyData.id}/order/`, orderData, { headers: dynamicHeaders({ token }) })] : []),
        ]).then(async () => {
          newCompanyData.photos = await dispatch(getUserCompanyPhotos(oldCompanyData.id as number));
        })
      }
      if (!Lodash.isEqual(oldCompanyData.certificates, companyCertificates)) {
        const companyCertificatesFormData = new FormData();
        const forPushArray = companyCertificates.reduce<MediaType[]>((prev, curr, order) => {
          if (!curr.id) return [...prev, Object.assign({ order }, curr)];
          else return prev;
        }, []);
        const forDeleteArray = oldCompanyData.certificates?.reduce<number[]>((prev, curr) => {
          if (curr.id && !companyCertificates.find(el => el.id === curr.id)) return [...prev, curr.id];
          else return prev;
        }, []) || [];
        const orderData = companyCertificates.reduce<{ id: number, order: number }[]>((prev, { id }, order) => id ? [...prev, { id, order: order }] : prev, []);

        forPushArray.forEach(({ path, mime, order }) => {
          if (Platform.OS === 'web' && path) {
            companyCertificatesFormData.append("file_location", base64ToBlob(path));
            // companyCertificatesFormData.append("order", JSON.stringify(order));
          } else {
            // @ts-ignore
            companyCertificatesFormData.append("file_location", {
              uri: path,
              name: path.slice(path.lastIndexOf('/') + 1),
              type: mime || 'image/jpeg'
            });
          }
        })

        companyCertificatesFormData.append("order_list", JSON.stringify(forPushArray.map(({ order }) => order)));
        // @ts-ignore
        companyCertificatesFormData.append("company_id", oldCompanyData.id);

        await Promise.all([
          ...(forPushArray.length ? [axios.post(`/employer/company_certificates/`, companyCertificatesFormData, {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
            transformRequest: () => companyCertificatesFormData
          })] : []),
          ...(forDeleteArray.map(id =>
            axios.delete(`/employer/company_certificates/${id}/`, { headers: dynamicHeaders({ token }) }).catch(() => { })
          )),
          ...(orderData.length ? [axios.post(`/employer/company_certificates/${oldCompanyData.id}/order/`, orderData, { headers: dynamicHeaders({ token }) })] : []),
        ]).then(async () => {
          newCompanyData.certificates = await dispatch(getUserCompanyCertificates(oldCompanyData.id as number));
        })
      }
      if (!Lodash.isEqual(oldCompanyData.contactPersons, companyContactPersons)) {
        const company_id = newCompanyData.id;

        const forPushArray = companyContactPersons.filter(item => !item.id).map(item => ({ ...item, company_id }));

        const forUpdateArray = companyContactPersons.filter(item => item.id && !Lodash.isEqual(item, oldCompanyData.contactPersons.find(el => el.id === item.id)));

        const forDeleteArray = oldCompanyData.contactPersons?.reduce<number[]>((prev, curr) => {
          if (curr.id && !companyContactPersons.find(el => el.id === curr.id)) return [...prev, curr.id];
          else return prev;
        }, []) || [];

        await Promise.all([
          ...(forPushArray.length ? [axios.post(`/employer/company_contact_persons/`, forPushArray, { headers: dynamicHeaders({ token }) })] : []),
          ...(forDeleteArray.map(id =>
            axios.delete(`/employer/company_contact_persons/${id}/`, { headers: dynamicHeaders({ token }) }).catch(() => { })
          )),
          ...(forUpdateArray.map(item =>
            axios.put(`/employer/company_contact_persons/${item.id}/`, item, { headers: dynamicHeaders({ token }) }).catch(() => { })
          )),
        ]).then(async () => {
          newCompanyData.contactPersons = await dispatch(getUserCompanyContactPersons(oldCompanyData.id as number));
        });
      };

      if (!Lodash.isEqual(oldCompanyData.other_locations, otherLocations)) {
        const company_id = newCompanyData.id;
        const getContactPersons = await dispatch(getUserCompanyContactPersons(oldCompanyData.id as number));

        console.log('oldCompanyData', oldCompanyData);
        console.log('oldCompanyData.other_locations', oldCompanyData.other_locations);
        console.log('otherLocations', otherLocations);
        console.log('oldCompanyData.contactPersons', oldCompanyData.contactPersons);
        console.log('getContactPersons', getContactPersons);

        const convertedOtherLocations = convertToBackEndCompanyOtherLocations(otherLocations, oldCompanyData.contactPersons, getContactPersons, company_id);
        console.log('convertedOtherLocations', convertedOtherLocations);

        const convertedOldOtherLocations = convertToBackEndCompanyOtherLocations(oldCompanyData.other_locations, oldCompanyData.contactPersons, getContactPersons, company_id);
        console.log('convertedOldOtherLocations', convertedOldOtherLocations);

        const forPushArray = convertedOtherLocations.filter(item => !item.id).map(item => ({ ...item, company_id }));

        const forUpdateArray = convertedOtherLocations.filter(item => item.id && !Lodash.isEqual(item, convertedOldOtherLocations.find(el => el.id === item.id)));

        const forDeleteArray = convertedOldOtherLocations?.reduce<number[]>((prev, curr) => {
          if (curr.id && !convertedOtherLocations.find(el => el.id === curr.id)) return [...prev, curr.id];
          else return prev;
        }, []) || [];

        await Promise.all([
          ...(forPushArray.length ? [axios.post(`/employer/other_locations/`, forPushArray, { headers: dynamicHeaders({ token }) })] : []),
          ...(forDeleteArray.map(id =>
            axios.delete(`/employer/other_locations/${id}/`, { headers: dynamicHeaders({ token }) }).catch(() => { })
          )),
          ...(forUpdateArray.map(item =>
            axios.put(`/employer/other_locations/${item.id}/`, item, { headers: dynamicHeaders({ token }) }).catch(() => { })
          )),
        ]).then(async () => {
          const getContactPersons = await dispatch(getUserCompanyContactPersons(oldCompanyData.id as number));
          console.log('contactPersons', getContactPersons);
          const getOtherLocations = await dispatch(getUserCompanyOtherLocations(oldCompanyData.id as number));
          newCompanyData.contactPersons = getContactPersons;
          newCompanyData.other_locations = convertToFrontEndCompanyOtherLocations(getOtherLocations, getContactPersons);
        });
      };

      await dispatch(generalActions.setUserCompany({ ...newCompanyData, address: convertToFrontEndAddress(newCompanyData.address as any), }));
    }
    return true;
  } catch (error: any) {
    return await errorHandler({ error, dispatch, getState, caller: editUserCompany.bind(this, props) });
  }
};

const deleteUserCompany = (id: number) => async (dispatch: AppDispatch, getState: () => rootState) => {
  const { token } = getState().general;
  try {
    await axios.delete(`/employer/companies/${id}/`, { headers: dynamicHeaders({ token }) }).catch(() => { });
    await dispatch(generalActions.setUserCompany(null));
    return true;
  } catch (error: any) {
    return await errorHandler({ error, dispatch, getState, caller: deleteUserCompany.bind(this, id) });
  }
};

const getUserCompanyLogo = (id: number) => async (dispatch: AppDispatch, getState: () => rootState) => {
  const { token } = getState().general;
  try {
    const res = await axios.get(`/employer/company_logo/${id}/`, { headers: dynamicHeaders({ token }) });
    return res.data[0] ? { ...res.data[0], path: baseURL + res.data[0].file_location } : null;
  } catch (error: any) {
    return await errorHandler({ error, returnDefaulValue: null, dispatch, getState, caller: getUserCompanyLogo.bind(this, id) });
  }
};

const getUserCompanyVideo = (id: number) => async (dispatch: AppDispatch, getState: () => rootState) => {
  const { token } = getState().general;
  try {
    const res = await axios.get(`/employer/company_video/${id}/`, { headers: dynamicHeaders({ token }) });
    return res.data[0] ? { ...res.data[0], path: baseURL + res.data[0].file_location } : null;
  } catch (error: any) {
    return await errorHandler({ error, returnDefaulValue: null, dispatch, getState, caller: getUserCompanyVideo.bind(this, id) });
  }
};

const getUserCompanyPhotos = (id: number) => async (dispatch: AppDispatch, getState: () => rootState) => {
  const { token } = getState().general;
  try {
    const res = await axios.get(`/employer/company_photos/${id}/`, { headers: dynamicHeaders({ token }) });
    return res.data?.map(({ images, ...el }: any) => ({ ...el, path: baseURL + images })) || null;
  } catch (error: any) {
    return await errorHandler({ error, returnDefaulValue: null, dispatch, getState, caller: getUserCompanyPhotos.bind(this, id) });
  }
};

const getUserCompanyCertificates = (id: number) => async (dispatch: AppDispatch, getState: () => rootState) => {
  const { token } = getState().general;
  try {
    const res = await axios.get(`/employer/company_certificates/${id}/`, { headers: dynamicHeaders({ token }) });
    return res.data?.map(({ file_location, ...el }: any) => ({ ...el, path: baseURL + file_location })) || null;
  } catch (error: any) {
    return await errorHandler({ error, returnDefaulValue: null, dispatch, getState, caller: getUserCompanyCertificates.bind(this, id) });
  }
};

const getUserCompanyContactPersons = (id: number) => async (dispatch: AppDispatch, getState: () => rootState) => {
  const { token } = getState().general;
  try {
    const res = await axios.get(`/employer/company_contact_persons/${id}/`, { headers: dynamicHeaders({ token }) });

    const updatedContactPersons = res.data.map((contact: { tempId: number; }) => ({
      ...contact,
      tempId: contact.tempId || Math.floor(Math.random() * 100000000000)
    }));

    return updatedContactPersons;
  } catch (error: any) {
    return await errorHandler({ error, returnDefaulValue: null, dispatch, getState, caller: getUserCompanyContactPersons.bind(this, id) });
  }
};

const getUserCompanyOtherLocations = (id: number) => async (dispatch: AppDispatch, getState: () => rootState) => {
  const { token } = getState().general;
  try {
    const res = await axios.get(`/employer/other_locations/${id}/`, { headers: dynamicHeaders({ token }) });

    const updatedLocations = res.data.map((location: { tempId: number; }) => ({
      ...location,
      tempId: location.tempId || Math.floor(Math.random() * 100000000000)
    }));

    return updatedLocations;
  } catch (error: any) {
    return await errorHandler({ error, returnDefaulValue: null, dispatch, getState, caller: getUserCompanyOtherLocations.bind(this, id) });
  }
};

const getCompanyRegistrationData = (nip: string) => async (dispatch: AppDispatch, getState: () => rootState) => {
  const { token } = getState().general;
  try {
    const res = await axios.get(`/employer/check-nip/${nip}/`, { headers: dynamicHeaders({ token }) });
    return res.data;
  } catch (error: any) {
    return await errorHandler({ error, returnDefaulValue: null, dispatch, getState, caller: getCompanyRegistrationData.bind(this, nip) });
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
  getCompanyRegistrationData,
  getUserCompanyOtherLocations,
}