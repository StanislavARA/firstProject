import { usersAPI } from "../api/api";
import { updateObjectArray } from "../utils/object-helpers";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";
//создаем первоначальный стейт (до начала "события/действия")
let initialState = {
    users: [],
    pageSize: 4,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
};


const usersReducer = (state = initialState, action) => { //описывается логика редьюсера, которая произойдет при событии

    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: updateObjectArray(state.users, action.userId, "id", { followed: true })
            }
        };
        case UNFOLLOW: {
            return {
                ...state,
                users: updateObjectArray(state.users, action.userId, "id", { followed: false })
            }
        };

        case SET_USERS: {
            return { ...state, users: action.users }
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count }
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }

        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching ? [...state.followingInProgress, action.userId] :
                    state.followingInProgress.filter((id) => {
                        return (id != action.userId)
                    })
            }
        }
        default:
            return state;
    }
};

// создаем action { type: ACTION_1, value_1: значение } для последующей передачи в диспач
export const followSuccess = (userId) => ({ type: FOLLOW, userId });

export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });

export const setUsers = (users) => ({ type: SET_USERS, users });

export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, currentPage: page });

export const setTotalUsersCount = (count) => ({ type: SET_TOTAL_USERS_COUNT, count });

export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });

export const requestUsers = (page, pageSize) => {
    return async (dispatch) => { // возвращаем thunk, где все функции(экшн криэйторы) должны диспатчиться
        dispatch(setCurrentPage(page));
        dispatch(toggleIsFetching(true));

        let response = await usersAPI.getUsers(page, pageSize);

        dispatch(toggleIsFetching(false));
        dispatch(setUsers(response.items));
        dispatch(setTotalUsersCount(response.totalCount));
    };
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId));
    let response = apiMethod(userId);

    if (response.resultCode === 0);
    {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId) => {
    return async (dispatch) => { // возвращаем thunk, где все функции(экшн криэйторы) должны диспатчиться
        let apiMethod = usersAPI.follow.bind(usersAPI);

        followUnfollowFlow(dispatch, userId, apiMethod, followSuccess)

    }
}


export const unfollow = (userId) => {
    return async (dispatch) => { // возвращаем thunk, где все функции(экшн криэйторы) должны диспатчиться
        let apiMethod = usersAPI.unfollow.bind(usersAPI);

        followUnfollowFlow(dispatch, userId, apiMethod, unfollowSuccess)

    }
}

export default usersReducer