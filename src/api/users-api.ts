import {APIResponseType, GetItemsType, instance} from "./api";
import {profileAPI} from "./profile-api";


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance
            .get<GetItemsType>(
                `users?page=${currentPage}&count=${pageSize}`).then((response) => {
                return response.data
            })
    },

    unfollow(userId: number) {
        return instance.delete<APIResponseType>(
            `follow/${userId}`).then(response => response.data)
    },

    follow(userId: number) {
        return instance.post <APIResponseType>(
            `follow/${userId}`).then(response => response.data)
    },

    getProfileData(userId: number) {
        return profileAPI.getProfileData(userId)
    }
}