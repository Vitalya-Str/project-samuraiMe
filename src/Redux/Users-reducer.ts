import {ResultCodeEnum, UsersAPI} from "../api/api";
import {UserType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";

const SUBSCRIBE = 'SUBSCRIBE'
const UNSUBSCRIBE = 'UNSUBSCRIBE'
const SET_USERS = 'SET_USERS'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const SET_IS_FETCHING = 'SET_IS_FETCHING'
const SET_FOLLOWING_IN_PROGRESS = 'SET_FOLLOWING_IN_PROGRESS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalItemsCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as number[]
}
type InitialStateType = typeof initialState

type ActionsTypes =
    SubscribeActionType
    | UnsubscribeActionType
    | SetUsersActionType
    | setTotalUsersCountActionType
    | SetCurrentPageActionType
    | SetIsFetchingActionType
    | SetFollowingInProgressActionType

const UsersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    if (action.type === 'SUBSCRIBE') {
        return {
            ...state,
            users:
                state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })

        }
    } else if (action.type === 'UNSUBSCRIBE') {
        return {
            ...state,
            users:
                state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })

        }
    } else if (action.type === 'SET_USERS') {
        return {...state, users: action.users}

    } else if (action.type === 'SET_TOTAL_USERS_COUNT') {
        return {...state, totalItemsCount: action.totalItemsCount}

    } else if (action.type === 'SET_CURRENT_PAGE') {
        return {...state, currentPage: action.currentPage}

    } else if (action.type === 'SET_IS_FETCHING') {
        return {...state, isFetching: action.isFetching}

    } else if (action.type === 'SET_FOLLOWING_IN_PROGRESS') {
        return {
            ...state,
            followingInProgress: action.isFetching ? [...state.followingInProgress, action.userId] :
                state.followingInProgress.filter(id => id !== action.userId)
        }

    }
    return state
}


type SubscribeActionType = {
    type: typeof SUBSCRIBE
    userId: number
}
export const subscribeAC = (userId: number): SubscribeActionType => ({type: 'SUBSCRIBE', userId})

type UnsubscribeActionType = {
    type: typeof UNSUBSCRIBE
    userId: number
}
export const unsubscribeAC = (userId: number): UnsubscribeActionType => ({type: 'UNSUBSCRIBE', userId})

type SetUsersActionType = {
    type: typeof SET_USERS
    users: UserType[]
}
export const setUsersAC = (users: UserType[]): SetUsersActionType => ({type: 'SET_USERS', users})

type setTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalItemsCount: number
}
export const setTotalUsersCountAC = (totalItemsCount: number): setTotalUsersCountActionType => ({
    type: 'SET_TOTAL_USERS_COUNT',
    totalItemsCount
})

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPageAC = (currentPage: number): SetCurrentPageActionType => ({
    type: 'SET_CURRENT_PAGE',
    currentPage
})

type SetIsFetchingActionType = {
    type: typeof SET_IS_FETCHING
    isFetching: boolean
}
export const setIsFetching = (isFetching: boolean): SetIsFetchingActionType => ({type: 'SET_IS_FETCHING', isFetching})

type SetFollowingInProgressActionType = {
    type: typeof SET_FOLLOWING_IN_PROGRESS
    isFetching: boolean
    userId: number
}
export const setFollowingInProgress = (isFetching: boolean, userId: number): SetFollowingInProgressActionType => ({
    type: 'SET_FOLLOWING_IN_PROGRESS',
    isFetching,
    userId
})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
export const requestUsers = (currentPage: number, pageSize: number): ThunkType => async (dispatch) => {
    dispatch(setIsFetching(true))
    dispatch(setCurrentPageAC(currentPage))
    const data = await UsersAPI.getUsers(currentPage, pageSize)
    dispatch(setIsFetching(false))
    dispatch(setUsersAC(data.items))
    dispatch(setTotalUsersCountAC(data.totalCount))
}
export const follow = (userId: number): ThunkType => async (dispatch) => {
    dispatch(setFollowingInProgress(true, userId))
    const data = await UsersAPI.follow(userId)
    if (data.resultCode === ResultCodeEnum.success) {
        dispatch(subscribeAC(userId))
    }
    dispatch(setFollowingInProgress(false, userId))
}
export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    dispatch(setFollowingInProgress(true, userId))
    const data = await UsersAPI.unfollow(userId)
    if (data.resultCode === ResultCodeEnum.success) {
        dispatch(unsubscribeAC(userId))
    }
    dispatch(setFollowingInProgress(false, userId))
}
export default UsersReducer