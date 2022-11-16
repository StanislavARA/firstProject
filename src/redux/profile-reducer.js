import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE ";
const SET_STATUS = "SET_STATUS ";

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
            let stateCopy = { ...state };
            stateCopy.posts = [...state.posts];
            stateCopy.posts.push(newPost);

            return stateCopy;
        }
        case UPDATE_NEW_POST_TEXT: {
            let stateCopy = { ...state }
            stateCopy.newPostText = action.newText;
            return stateCopy;
        }
        case SET_USER_PROFILE: {

            return { ...state, currentProfile: action.profile }
        }
        case SET_STATUS: {

            return { ...state, status: action.status }
        }

        default:
            return state;
    }
};

// создаем action { type: ACTION_1, value_1: значение } для последующей передачи в диспач
export const addPostActionCreator = (textPost) => ({ type: ADD_POST, textPost });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status) => ({ type: SET_STATUS, status });



export const getUserProfile = (userId) => {
    return (dispatch) => {
        usersAPI.getProfileData(userId).then((profile) => {
            dispatch(setUserProfile(profile));
        })

    }
}

export const getStatus = (status) => {
    return (dispatch) => {
        profileAPI.getStatus(status).then((response) => {
            dispatch(setStatus(response.data));
        })

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

export default profileReducer