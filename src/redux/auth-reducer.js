import axios from "axios";
import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";



const SET_USER_DATA = "auth/SET_USER_DATA";
const SET_USER_AVATAR = "auth/SET_USER_AVATAR";

//создаем первоначальный стейт (до начала "события/действия")
let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    avatar: null,

};


const authReducer = (state = initialState, action) => { //описывается логика редьюсера, которая произойдет при событии

    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data
            }
        };
        case SET_USER_AVATAR: {
            return {
                ...state,
                avatar: action.avatar
            }
        };

        default:
            return state;
    }
};

// создаем action { type: ACTION_1, value_1: значение } для последующей передачи в диспач
export const setUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, data: { userId, email, login, isAuth } });

export const setUserAva = (avatar) => ({ type: SET_USER_AVATAR, avatar });

export const getAuthUser = () => {
    return async (dispatch) => { // пишем return, чтобы диспатч "dispatch(getAuthUser())" в app-reducer вернул нам промис, на который мы подпишемся then в initializeApp
        let response = await authAPI.getDataLoginUser();

        if (response.resultCode === 0) {
            let { id, email, login } = response.data;
            dispatch(setUserData(id, email, login, true));

            let res = await axios.get(
                `https://social-network.samuraijs.com/api/1.0/profile/${id}`,
                {
                    withCredentials: true,
                }
            )

            let ava = res.data.photos.small;
            dispatch(setUserAva(ava));
        };
    }

}





export const login = (email, password, rememberMe) => {
    return async (dispatch) => {
        let response = await authAPI.login(email, password, rememberMe);

        if (response.data.resultCode === 0) {
            dispatch(getAuthUser())
        }
        else {
            let messageError = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
            dispatch(stopSubmit("Login", { _error: messageError }));    // при возникновении ошибки вызываем экшн криэйтор stopSubmit - стопаем форму с именем form: "Login", вторым параметром передаем объект с ошибкой диспатчим AC, который потом сам найдет указанную форму и передаст в пропс error  наш messageError

        }

    }
}

export const logout = () => {
    return (dispatch) => {
        authAPI.logout().then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(setUserData(null, null, null, false))
            }
        })
    }
}


export default authReducer