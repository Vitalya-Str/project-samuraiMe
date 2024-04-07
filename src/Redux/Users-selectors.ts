import {AppStateType} from "./store";

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalItemsCount
}

export const getsUsers = (state: AppStateType) => {
    return state.usersPage.users
}

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
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
export const searchTerm = (state: AppStateType) => {
    return state.usersPage.filter
}

