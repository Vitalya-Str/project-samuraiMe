import {authAPI} from "../api/api";

const SET_AUTH_DATA = 'SET_AUTH_DATA'

const initialState = {
    id: null,
    email: null,
    login: null,
    rememberMe: null,
    captcha: null,
    isAuth: false

}
const AuthReducer = (state = initialState, action) => {

    if (action.type === SET_AUTH_DATA) {
        return {
            ...state,
            ...action.data,
        }
    }

    return state
}

export const setAuthUserData = (id, email, login, isAuth) => ({type: SET_AUTH_DATA, data: {id, email, login, isAuth}})

export const setAuth = () => async (dispatch) => {
    const data = await authAPI.authMe()
    if (data.resultCode === 0) {
        const {id, email, login} = data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const postAuthLogin = (email, password, rememberMe, captcha) => async (dispatch) => {
    const data = await authAPI.authLogin(email, password, rememberMe, captcha)
    if (data.data.resultCode === 0) {
        dispatch(setAuth())
    }
}

export const delLogin = () => async (dispatch) => {
    const response = await authAPI.logOut()
    if (response.data.resultCode === 0)
        dispatch(setAuthUserData(null, null, null, false))
}


export default AuthReducer