import axios from "axios";
import {stopSubmit} from "redux-form";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";
import {ResultCodesEnum} from "../api/api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

const SET_USER_DATA = "auth/SET_USER_DATA";
const SET_USER_AVATAR = "auth/SET_USER_AVATAR";
const GET_CAPTCHA_URL_SUCCESS = "auth/GET_CAPTCHA_URL_SUCCESS";

//создаем первоначальный стейт (до начала "события/действия")

let initialState = {
    userId: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
    avatar: null as null | string,
    captchaURL: null as null | string
};

type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actionsAuth>

const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => { //описывается логика редьюсера, которая произойдет при событии

    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data
            }
        }
            ;
        case SET_USER_AVATAR: {
            return {
                ...state,
                avatar: action.avatar
            }
        }
            ;
        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                captchaURL: action.captchaURL
            }
        }
            ;

        default:
            return state;
    }
};

export const actionsAuth = {
    // создаем action { type: ACTION_1, value_1: значение } для последующей передачи в диспач
    setUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: SET_USER_DATA,
        data: {userId, email, login, isAuth}
    } as const),

    setUserAva: (avatar: string) => ({type: SET_USER_AVATAR, avatar} as const),

    getCaptchaURLSuccess: (captchaURL: string) => ({
        type: GET_CAPTCHA_URL_SUCCESS,
        captchaURL
    } as const),

}


export const getAuthUser = (): BaseThunkType<ActionsType> => {
    return async (dispatch) => { // пишем return, чтобы диспатч "dispatch(getAuthUser())" в app-reducer вернул нам промис, на который мы подпишемся then в initializeApp
        let response = await authAPI.getDataLoginUser();

        if (response.resultCode === ResultCodesEnum.Success) {
            let {id, email, login} = response.data;
            dispatch(actionsAuth.setUserData(id, email, login, true));

            let res = await axios.get(
                `https://social-network.samuraijs.com/api/1.0/profile/${id}`,
                {
                    withCredentials: true,
                }
            )

            let ava = res.data.photos.small;
            dispatch(actionsAuth.setUserAva(ava));
        }
    }
}


export const login = (email: string,
                      password: string,
                      rememberMe: boolean,
                      captcha: any):
    BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>> => {
    return async (dispatch) => {
        let loginData = await authAPI.login(email, password, rememberMe, captcha);

        if (loginData.resultCode === ResultCodesEnum.Success) {
            dispatch(getAuthUser())
        } else {
            if (loginData.resultCode === ResultCodesEnum.CaptchaIsRequired) {
                dispatch(getCaptchaURL())
            }
            let messageError = loginData.messages.length > 0 ? loginData.messages[0] : "Some error";
            dispatch(stopSubmit("Login", {_error: messageError}));    // при возникновении ошибки вызываем экшн криэйтор stopSubmit - стопаем форму с именем form: "Login", вторым параметром передаем объект с ошибкой диспатчим AC, который потом сам найдет указанную форму и передаст в пропс error  наш messageError
        }
    }
}


export const getCaptchaURL = (): BaseThunkType<ActionsType> => {
    return async (dispatch) => {
        let response = await securityAPI.getCaptchaURL();
        const captchaURL = response.url;
        dispatch(actionsAuth.getCaptchaURLSuccess(captchaURL))
    }
}

export const logout = (): BaseThunkType<ActionsType, void> => {
    return (dispatch) => {
        authAPI.logout().then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(actionsAuth.setUserData(null, null, null, false))
            }
        })
    }
}


export default authReducer