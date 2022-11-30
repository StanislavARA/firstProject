import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "5e709e2b-1098-4acd-9e50-8a198c1ac15b",
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance
            .get(
                `users?page=${currentPage}&count=${pageSize}`).then((response) => { return response.data })
    },

    unfollow(userId) {
        return instance.delete(
            `follow/${userId}`).then(response => response.data)
    },

    follow(userId) {
        return instance.post(
            `follow/${userId}`).then(response => response.data)
    },

    getProfileData(userId) {
        return profileAPI.getProfileData(userId)
    }


}


export const profileAPI = {

    getProfileData(userId) {
        return instance.get(`profile/${userId}`).then((response) => response.data)
    },

    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },

    updateStatus(status) {
        return instance.put(`profile/status`, { status: status })
    },
    savePhoto(photoFile) {
        let formData = new FormData();
        debugger;
        formData.append("image", photoFile);
        return instance.put(`profile/photo`, formData)
    }

}


export const authAPI = {

    getDataLoginUser() { return instance.get(`auth/me`).then(response => response.data) },

    login(email, password, rememberMe = false) {
        return instance.post(`/auth/login`, { email, password, rememberMe })
    },
    logout() {
        return instance.delete(`/auth/login`)
    }
}

