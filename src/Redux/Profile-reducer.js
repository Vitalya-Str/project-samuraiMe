import {profileAPI} from "../api/api";

const ADD_POST = 'ADD_POST'
const SET_USERS_PROFILE = 'SET_USERS_PROFILE'
const SET_STATUS = 'SET_STATUS'

const initialState = {
    posts: [
        {id: 1, message: 'Hello!', likeCount: 1},
        {id: 2, message: 'Buy', likeCount: 35}
    ],
    profile: null,
    status: ""
}
const ProfileReducer = (state = initialState, action) => {
    if (action.type === ADD_POST) {
        return {
            ...state,
            posts: [...state.posts, {id: 3, message: action.newPostElement, likeCount: '4'}]
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
    }
    return state
}

export const addPostActionCreator = (newPostElement) => ({type: ADD_POST, newPostElement})
export const setUsersProfile = (profile) => ({type: SET_USERS_PROFILE, profile})
export const setStatusProfile = (status) => ({type: SET_STATUS, status})


export const setProfile = (userId) => async (dispatch) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(setUsersProfile(response.data))
}
export const getStatus = (userId) => async (dispatch) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatusProfile(response.data))
}
export const updateStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatusProfile(status))
    }
}
export default ProfileReducer