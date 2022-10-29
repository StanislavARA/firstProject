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
    }

}

export const authAPI = {

    getDataLoginUser() { return instance.get(`auth/me`).then(response => response.data) }
}

