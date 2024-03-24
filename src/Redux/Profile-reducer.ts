import {ResultCodeEnum, profileAPI} from "../api/api";
import {PhotoType, PostType, ProfileType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./store";

const initialState = {
    posts: [
        {id: 1, message: 'Hello!', likeCount: 1},
        {id: 2, message: 'Buy', likeCount: 35}
    ] as PostType[],
    profile: null as ProfileType | null,
    status: '',
    newPostElement: ''
}
type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
    addPostActionCreator: (newPostElement: string) => ({type: 'ADD_POST', newPostElement} as const),
    setUsersProfile: (profile: ProfileType) => ({type: 'SET_USERS_PROFILE', profile} as const),
    setStatusProfile: (status: string) => ({type: 'SET_STATUS', status} as const),
    savePhotoProfileSuccess: (photos: PhotoType) => ({type: 'SAVE_PHOTO_SACCESS', photos} as const),
}
const ProfileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    if (action.type === 'ADD_POST') {
        return {
            ...state,
            posts: [...state.posts, {id: 3, message: action.newPostElement, likeCount: 4}]
        }
    } else if (action.type === 'SET_USERS_PROFILE') {
        return {
            ...state,
            profile: action.profile
        }
    } else if (action.type === 'SET_STATUS') {
        return {
            ...state,
            status: action.status
        }
    } else if (action.type === 'SAVE_PHOTO_SACCESS') {
        return {
            ...state,
            profile: {...state.profile, photos: action.photos}
        }
    }
    return state
}

type ThunkActionsType = BaseThunkType < ActionsType>

export const setProfile = (userId: number): ThunkActionsType => async (dispatch) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(actions.setUsersProfile(response.data))
}
export const savePhoto = (file: File): ThunkActionsType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)

    if (data.resultCode === ResultCodeEnum.success) {
        dispatch(actions.savePhotoProfileSuccess(data.photos))
    }
}
export const setStatus = (userId: number): ThunkActionsType => async (dispatch) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(actions.setStatusProfile(response.data))
}
export const updateStatus = (status: string): ThunkActionsType => async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === ResultCodeEnum.success) {
        dispatch(actions.setStatusProfile(status))
    }
}
export default ProfileReducer