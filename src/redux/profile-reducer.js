import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE ";
const SET_STATUS = "SET_STATUS ";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

//создаем первоначальный стейт (до начала "события/действия")
let initialState = {
   posts: [
      {
         id: 1,
         message: "hello, I'am Cat",
         likes: 22,
         avatar:
          "https://www.meme-arsenal.com/memes/baa72248e5d44682994a2363bb10e635.jpg",
      },
      {
         id: 2,
         message: "hello, I'am Dog",
         likes: 2,
         avatar:
          "https://play-lh.googleusercontent.com/6f6MrwfRIEnR-OIKIt_O3VdplItbaMqtqgCNSOxcfVMCKGKsOdBK5XcI6HZpjssnB2Y",
      },
   ],
   newPostText: "it-kamasutra.com",
   currentProfile: null,
   status: "",

};


const profileReducer = (state = initialState, action) => { //описывается логика редьюсера, которая произойдет при событии

   switch (action.type) {
      case ADD_POST: {
         let newPost = {
            id: 5,
            message: action.textPost,
            likes: 0,
            avatar: null,
         }
         let stateCopy = {...state};
         stateCopy.posts = [...state.posts];
         stateCopy.posts.push(newPost);

         return stateCopy;
      }
      case UPDATE_NEW_POST_TEXT: {
         let stateCopy = {...state}
         stateCopy.newPostText = action.newText;
         return stateCopy;
      }
      case SET_USER_PROFILE: {

         return {...state, currentProfile: action.profile}
      }
      case SET_STATUS: {

         return {...state, status: action.status}
      }
      case DELETE_POST: {

         return {...state, posts: state.posts.filter(p => p.id != action.postId)}
      }

      case SAVE_PHOTO_SUCCESS: {
         return {...state, currentProfile: {...state.currentProfile, photos: action.photo}}
      }

      default:
         return state;
   }
};

// создаем action { type: ACTION_1, value_1: значение } для последующей передачи в диспач
export const addPostActionCreator = (textPost) => ({type: ADD_POST, textPost});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const deletePost = (postId) => ({type: DELETE_POST, postId});
export const savePhotoSuccess = (photo) => ({type: SAVE_PHOTO_SUCCESS, photo})

export const getUserProfile = (userId) => {
   return async (dispatch) => {
      let response = await usersAPI.getProfileData(userId);
      dispatch(setUserProfile(response));
   }

}


export const getStatus = (userId) => {
   return async (dispatch) => {
      let response = await profileAPI.getStatus(userId);
      if (response.data && response.data.resultCode === 0) {

         dispatch(setStatus(response.data));
      }
   }

}


export const updateStatus = (status) => {
   return (dispatch) => {
      profileAPI.updateStatus(status).then((response) => {
         if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
         }
      })

   }
}

export const savePhoto = (photo) => {
   return async (dispatch) => {
      let res = await profileAPI.savePhoto(photo);
      if (res.data.resultCode === 0) {
         dispatch(savePhotoSuccess(res.data.data.photos));
      }
   }
}

export const saveProfile = (profile) => {

   return async (dispatch, getState) => {
      const userId = getState().auth.userId
      let res = await profileAPI.saveProfile(profile);
      if (res.data.resultCode === 0) {
         dispatch(getUserProfile(userId));
      } else {
         const message = res.data.messages[0].slice(30, -1).toLowerCase();
         dispatch(stopSubmit("edit-profile", {
            "contacts": {
               [message]: res.data.messages[0]
            }
         }))
         return Promise.reject('er') //возвращаем промис реджект, показать невыполнение и не переключить editMode в ProfileDataForm/onSubmit
      }
   }
}
export default profileReducer