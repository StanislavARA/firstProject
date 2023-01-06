import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../Types/Types";
import {usersAPI} from "../api/users-api";
import {profileAPI} from "../api/profile-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

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
    ] as Array<PostType>,
    newPostText: "it-kamasutra.com",
    currentProfile: null as ProfileType | null,
    status: "" as string | null,

};
export type InitialStateType = typeof initialState


const profileReducer = (state = initialState, action: ActionsType): InitialStateType => { //описывается логика редьюсера, которая произойдет при событии

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.textPost,
                likes: 0,
                avatar: undefined,
            }
            let stateCopy = {...state};
            stateCopy.posts = [...state.posts];
            stateCopy.posts.push(newPost);

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
            return {...state, currentProfile: {...state.currentProfile, photos: action.photo} as ProfileType}
        }

        default:
            return state;
    }
};

type ActionsType = InferActionsTypes<typeof actionsProfile>
export type ThunkType = BaseThunkType<ActionsType | FormAction>

export const actionsProfile = {
    // создаем action { type: ACTION_1, value_1: значение } для последующей передачи в диспач
    addPostActionCreator: (textPost: string) => ({type: ADD_POST, textPost} as const),
    setUserProfile: (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const),
    setStatus: (status: string) => ({type: SET_STATUS, status} as const),
    deletePost: (postId: number) => ({type: DELETE_POST, postId} as const),
    savePhotoSuccess: (photo: PhotosType) => ({type: SAVE_PHOTO_SUCCESS, photo} as const)

}


export const getUserProfile = (userId: number): ThunkType => {
    return async (dispatch) => {
        let response = await usersAPI.getProfileData(userId);
        dispatch(actionsProfile.setUserProfile(response));
    }

}


export const getStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(userId);
        if (response.data && response.data.resultCode === 0) {
            dispatch(actionsProfile.setStatus(response.data));
        }
    }

}


export const updateStatus = (status: string): ThunkType => {
    return async (dispatch) => {
        try {
            let res = await profileAPI.updateStatus(status);
            if (res.resultCode === 0) {
                dispatch(actionsProfile.setStatus(status));
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const savePhoto = (photoFile: File): ThunkType => {
    return async (dispatch) => {
        let res = await profileAPI.savePhoto(photoFile);
        if (res.resultCode === 0) {
            dispatch(actionsProfile.savePhotoSuccess(res.data.photos));
        }
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => {

    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        let res = await profileAPI.saveProfile(profile);
        if (res.data.resultCode === 0) {
            dispatch(getUserProfile(userId!));
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