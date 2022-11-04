import axios from "axios";
import { authAPI } from "../api/api";


const SET_USER_DATA = "SET_USER_DATA";
const SET_USER_AVATAR = "SET_USER_AVATAR";

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
                ...action.data,
                isAuth: true
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
export const setUserData = (userId, email, login) => ({ type: SET_USER_DATA, data: { userId, email, login } });

export const setUserAva = (avatar) => ({ type: SET_USER_AVATAR, avatar });

export const getAuthUser = () => {
    return (dispatch) => {
        authAPI.getDataLoginUser().then((data) => {
            if (data.resultCode === 0) {
                let { id, email, login } = data.data;
                dispatch(setUserData(id, email, login));
                axios
                    .get(
                        `https://social-network.samuraijs.com/api/1.0/profile/${id}`,
                        {
                            withCredentials: true,
                        }
                    )
                    .then((response) => {
                        let ava = response.data.photos.small;
                        dispatch(setUserAva(ava));
                    });
            }

        })

    }
}


export default authReducer