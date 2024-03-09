import {profileAPI} from "../api/api";
import {PhotoType, PostType, ProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";
import * as stream from "stream";

const ADD_POST = 'ADD_POST'
const SET_USERS_PROFILE = 'SET_USERS_PROFILE'
const SET_STATUS = 'SET_STATUS'
const SAVE_PHOTO_SACCESS = 'SAVE_PHOTO_SACCESS'



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

type ActionsType = AddPostActionType | SetUsersProfileActionType | SetStatusProfileActionType | SavePhotoProfileSuccessActionType
const ProfileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    if (action.type === ADD_POST) {
        return {
            ...state,
            posts: [...state.posts, {id: 3, message: action.newPostElement, likeCount: 4}]
        }
    } else if (action.type === SET_USERS_PROFILE) {
        return {
            ...state,
            profile: action.profile
        }
    } else if (action.type === SET_STATUS) {
        return {
            ...state,
            status: action.status
        }
    } else if (action.type === SAVE_PHOTO_SACCESS) {
        return {
            ...state,
            profile: {...state.profile, photos: action.photos}
        }
    }
    return state
}
type AddPostActionType = {
    type: typeof ADD_POST
    newPostElement: string
}
export const addPostActionCreator = (newPostElement: string): AddPostActionType => ({type: ADD_POST, newPostElement})

type SetUsersProfileActionType = {
    type: typeof SET_USERS_PROFILE
    profile: ProfileType
}
export const setUsersProfile = (profile: ProfileType): SetUsersProfileActionType => ({type: SET_USERS_PROFILE, profile})

type SetStatusProfileActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatusProfile = (status: string): SetStatusProfileActionType => ({type: SET_STATUS, status})

type SavePhotoProfileSuccessActionType = {
    type: typeof SAVE_PHOTO_SACCESS
    photos: PhotoType
}
export const savePhotoProfileSuccess = (photos: PhotoType): SavePhotoProfileSuccessActionType => ({
    type: SAVE_PHOTO_SACCESS,
    photos
})

type ThunkActionsType =  ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const setProfile = (userId: number):ThunkActionsType => async (dispatch) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(setUsersProfile(response.data))
}
export const savePhoto = (file: any):ThunkActionsType => async (dispatch) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoProfileSuccess(response.data.data.photos))
    }
}
export const setStatus = (userId: number):ThunkActionsType => async (dispatch) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatusProfile(response.data))
}
export const updateStatus = (status: string): ThunkActionsType => async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatusProfile(status))
    }
}
export default ProfileReducer