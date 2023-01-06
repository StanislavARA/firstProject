import {updateObjectArray} from "../utils/object-helpers";
import {UserType} from "../Types/Types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/users-api";

//создаем первоначальный стейт (до начала "события/действия")

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 4,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> // array of users id
};

export type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: UsersActionsTypes): InitialStateType => { //описывается логика редьюсера, которая произойдет при событии

    switch (action.type) {
        case "FOLLOW": {
            return {
                ...state,
                users: updateObjectArray(state.users, action.userId, "id", {followed: true})
            }
        }

        case "UNFOLLOW": {
            return {
                ...state,
                users: updateObjectArray(state.users, action.userId, "id", {followed: false})
            }
        }


        case "SET_USERS": {
            return {...state, users: action.users}
        }
        case "SET_CURRENT_PAGE": {
            return {...state, currentPage: action.currentPage}
        }
        case "SET_TOTAL_USERS_COUNT": {
            return {...state, totalUsersCount: action.count}
        }
        case "TOGGLE_IS_FETCHING": {
            return {...state, isFetching: action.isFetching}
        }

        case "TOGGLE_IS_FOLLOWING_PROGRESS": {
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

type UsersActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    followSuccess: (userId: number) => ({type: 'FOLLOW', userId} as const),

    unfollowSuccess: (userId: number) => ({type: 'UNFOLLOW', userId} as const),

    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),

    setCurrentPage: (page: number) => ({type: 'SET_CURRENT_PAGE', currentPage: page} as const),

    setTotalUsersCount: (count: number) => ({type: 'SET_TOTAL_USERS_COUNT', count} as const),

    toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),

    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const)
}


export const requestUsers = (page: number, pageSize: number): BaseThunkType<UsersActionsTypes> => {
    return async (dispatch, getState) => { // возвращаем thunk, где все функции(экшн криэйторы) должны диспатчиться
        dispatch(actions.setCurrentPage(page));
        dispatch(actions.toggleIsFetching(true));

        let response = await usersAPI.getUsers(page, pageSize);

        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(response.items));
        dispatch(actions.setTotalUsersCount(response.totalCount));
    };
}

const _followUnfollowFlow = async (dispatch: Dispatch<UsersActionsTypes>,
                                   userId: number,
                                   apiMethod: any,
                                   actionCreator: (userId: number) => UsersActionsTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);

    if (response.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): BaseThunkType<UsersActionsTypes> => {
    return async (dispatch) => { // возвращаем thunk, где все функции(экшн криэйторы) должны диспатчиться
        let apiMethod = usersAPI.follow.bind(usersAPI);

        await _followUnfollowFlow(dispatch, userId, apiMethod, actions.followSuccess)

    }
}


export const unfollow = (userId: number): BaseThunkType<UsersActionsTypes> => {
    return async (dispatch) => { // возвращаем thunk, где все функции(экшн криэйторы) должны диспатчиться
        let apiMethod = usersAPI.unfollow.bind(usersAPI);

        await _followUnfollowFlow(dispatch, userId, apiMethod, actions.unfollowSuccess)

    }
}

export default usersReducer