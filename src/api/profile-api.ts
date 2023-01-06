import {PhotosType, ProfileType} from "../Types/Types";
import {APIResponseType, instance} from "./api";

type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {

    getProfileData(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then((response) => response.data)
    },

    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
    },

    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, {status: status}).then(res=>res.data)
    },
    savePhoto(photoFile: any) {
        let formData = new FormData();
        formData.append("image", photoFile);
        return instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData).then(res=>res.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>(`profile`, profile)
    }

}