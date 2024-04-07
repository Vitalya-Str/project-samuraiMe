import { ResultCodeEnum, UsersAPI } from "../api/api";
import { UserType } from "../types/types";
import { BaseThunkType, InferActionsTypes } from "./store";

const initialState = {
    users: [] as UserType[],
    pageSize: 5,
    totalItemsCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as number[],
    filter: {
        term: '',
        friend: null as null | boolean
    }
}
type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    subscribeAC: (userId: number) => ({ type: 'SUBSCRIBE', userId } as const),
    unsubscribeAC: (userId: number) => ({ type: 'UNSUBSCRIBE', userId } as const),
    setUsersAC: (users: UserType[]) => ({ type: 'SET_USERS', users } as const),
    setTotalUsersCountAC: (totalItemsCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', totalItemsCount } as const),
    setCurrentPageAC: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
    setIsFetching: (isFetching: boolean) => ({ type: 'SET_IS_FETCHING', isFetching } as const),
    searchFormik: (filter: FilterType) => ({ type: 'SEARCH_TERM', payload: filter } as const),
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
                        return { ...u, followed: true }
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
                        return { ...u, followed: false }
                    }
                    return u
                })

        }
    } else if (action.type === 'SET_USERS') {
        return { ...state, users: action.users }

    } else if (action.type === 'SET_TOTAL_USERS_COUNT') {
        return { ...state, totalItemsCount: action.totalItemsCount }

    } else if (action.type === 'SET_CURRENT_PAGE') {
        return { ...state, currentPage: action.currentPage }

    } else if (action.type === 'SET_IS_FETCHING') {
        return { ...state, isFetching: action.isFetching }

    } else if (action.type === 'SEARCH_TERM') {
        return { ...state, filter: action.payload }

    } else if (action.type === 'SET_FOLLOWING_IN_PROGRESS') {
        return {
            ...state,
            followingInProgress: action.isFetching ? [...state.followingInProgress, action.userId] :
                state.followingInProgress.filter(id => id !== action.userId)
        }

    }
    return state
}

type ThunkType = BaseThunkType<ActionsTypes>

export const requestUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => async (dispatch) => {
    dispatch(actions.setIsFetching(true))
    dispatch(actions.setCurrentPageAC(currentPage))
    dispatch(actions.searchFormik(filter))

    const data = await UsersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)

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