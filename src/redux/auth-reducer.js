import axios from "axios";
import {stopSubmit} from "redux-form";
import {authAPI, securityAPI} from "../api/api";


const SET_USER_DATA = "auth/SET_USER_DATA";
const SET_USER_AVATAR = "auth/SET_USER_AVATAR";
const GET_CAPTCHA_URL_SUCCESS = "auth/GET_CAPTCHA_URL_SUCCESS";

//создаем первоначальный стейт (до начала "события/действия")
let initialState = {
   userId: null,
   email: null,
   login: null,
   isAuth: false,
   avatar: null,
   captchaURL: null

};


const authReducer = (state = initialState, action) => { //описывается логика редьюсера, которая произойдет при событии

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

// создаем action { type: ACTION_1, value_1: значение } для последующей передачи в диспач
export const setUserData = (userId, email, login, isAuth) => ({
   type: SET_USER_DATA,
   data: {userId, email, login, isAuth}
});

export const setUserAva = (avatar) => ({type: SET_USER_AVATAR, avatar});

export const getCaptchaURLSuccess = (captchaURL) => ({
   type: GET_CAPTCHA_URL_SUCCESS,
   captchaURL
});

export const getAuthUser = () => {
   return async (dispatch) => { // пишем return, чтобы диспатч "dispatch(getAuthUser())" в app-reducer вернул нам промис, на который мы подпишемся then в initializeApp
      let response = await authAPI.getDataLoginUser();

      if (response.resultCode === 0) {
         let {id, email, login} = response.data;
         dispatch(setUserData(id, email, login, true));

         let res = await axios.get(
          `https://social-network.samuraijs.com/api/1.0/profile/${id}`,
          {
             withCredentials: true,
          }
         )

         let ava = res.data.photos.small;
         dispatch(setUserAva(ava));
      }
      ;
   }

}


export const login = (email, password, rememberMe, captcha) => {
   return async (dispatch) => {
      let response = await authAPI.login(email, password, rememberMe, captcha);

      if (response.data.resultCode === 0) {
         dispatch(getAuthUser())
      } else {
         if (response.data.resultCode === 10) {
            dispatch(getCaptchaURL())
         }
         let messageError = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
         dispatch(stopSubmit("Login", {_error: messageError}));    // при возникновении ошибки вызываем экшн криэйтор stopSubmit - стопаем форму с именем form: "Login", вторым параметром передаем объект с ошибкой диспатчим AC, который потом сам найдет указанную форму и передаст в пропс error  наш messageError

      }
   }
}

export const getCaptchaURL = (e) => {
   return async (dispatch) => {
      let response = await securityAPI.getCaptchaURL();
      const captchaURL = response.data.url;
      dispatch(getCaptchaURLSuccess(captchaURL))

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