import { createSelector } from "reselect"
import {AppStateType} from "./redux-store";

export const getAllUsers = (state: AppStateType) => { // функция, которая принимает стейт, достает нужное и возвращает в bll
    return state.usersPage.users
}

export const getUsersSelector = (state: AppStateType) => {
    return getAllUsers(state).filter(u => true)
}

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}
export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}

//создаем вычисляемый селектор при помощи библиотеки reselect, который проверяет наличие изменений зависимостей getAllUsers, getIsFetching, и если они есть - производит вычисление, если нет, то возвращает "кешированные" данные для того, чтобы не вызывать ререндер, если входные данные не изменились
export const getUsersSuperSelector = createSelector(getAllUsers, getIsFetching, (users, isFetching) => {
    return users.filter(u => true)
})
