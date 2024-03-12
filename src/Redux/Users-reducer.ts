import {ResultCodeEnum, UsersAPI} from "../api/api";
import {UserType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./store";

const initialState = {
    users: [] as UserType[],
    pageSize: 10,
    totalItemsCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as number[]
}
type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    subscribeAC: (userId: number) => ({ type: 'SUBSCRIBE', userId } as const),
    unsubscribeAC: (userId: number) => ({ type: 'UNSUBSCRIBE', userId } as const),
    setUsersAC: (users: UserType[]) => ({ type: 'SET_USERS', users } as const),
    setTotalUsersCountAC: (totalItemsCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', totalItemsCount } as const),
    setCurrentPageAC: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
    setIsFetching: (isFetching: boolean) => ({ type: 'SET_IS_FETCHING', isFetching } as const),
    setFollowingInProgress: (isFetching: boolean, userId: number) => ({
        type: 'SET_FOLLOWING_IN_PROGRESS',
        isFetching,
        userId
    } as const)
}


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


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
export const requestUsers = (currentPage: number, pageSize: number): ThunkType => async (dispatch) => {
    dispatch(actions.setIsFetching(true))
    dispatch(actions.setCurrentPageAC(currentPage))
    const data = await UsersAPI.getUsers(currentPage, pageSize)
    dispatch(actions.setIsFetching(false))
    dispatch(actions.setUsersAC(data.items))
    dispatch(actions.setTotalUsersCountAC(data.totalCount))
}
export const follow = (userId: number): ThunkType => async (dispatch) => {
    dispatch(actions.setFollowingInProgress(true, userId))
    const data = await UsersAPI.follow(userId)
    if (data.resultCode === ResultCodeEnum.success) {
        dispatch(actions.subscribeAC(userId))
    }
    dispatch(actions.setFollowingInProgress(false, userId))
}
export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    dispatch(actions.setFollowingInProgress(true, userId))
    const data = await UsersAPI.unfollow(userId)
    if (data.resultCode === ResultCodeEnum.success) {
        dispatch(actions.unsubscribeAC(userId))
    }
    dispatch(actions.setFollowingInProgress(false, userId))
}
export default UsersReducer