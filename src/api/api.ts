import axios from "axios";
import {UserType} from "../Types/Types";


export const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "5e709e2b-1098-4acd-9e50-8a198c1ac15b",
    }
})


export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

export type APIResponseType<T = {}> = {
    data: T
    resultCode: ResultCodesEnum
    messages: Array<string>
}