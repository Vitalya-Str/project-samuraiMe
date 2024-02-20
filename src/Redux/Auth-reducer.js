import {authAPI, securityAPI} from "../api/api";

const SET_AUTH_DATA = 'SET_AUTH_DATA'
const SET_CAPTCHA_SACCESS = 'SET_CAPTCHA_SACCESS'

const initialState = {
    id: null,
    email: null,
    login: null,
    rememberMe: null,
    isAuth: false,
    captcha: null
}
const AuthReducer = (state = initialState, action) => {

    if (action.type === SET_AUTH_DATA) {
        return {
            ...state,
            ...action.data,
        }
    } else {
        if (action.type === SET_CAPTCHA_SACCESS) {
            return {
                ...state,
                captcha: action.captcha
            }
        }
    }

    return state
}

export const setAuthUserData = (id, email, login, isAuth) => ({type: SET_AUTH_DATA, data: {id, email, login, isAuth}})
export const setCaptchaSaccess = (captcha) => ({type: SET_CAPTCHA_SACCESS, captcha})

export const setAuth = () => async (dispatch) => {
    const data = await authAPI.authMe()
    if (data.resultCode === 0) {
        const {id, email, login} = data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}
export const postAuthLogin = (email, password, rememberMe, captcha) => async (dispatch) => {
    const response = await authAPI.authLogin(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(setAuth())
    } else if (response.data.resultCode === 10) {
        dispatch(getCaptchaURL())
    }

}
export const getCaptchaURL = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    dispatch(setCaptchaSaccess(response.data.url))
}
export const delLogin = () => async (dispatch) => {
    const response = await authAPI.logOut()
    if (response.data.resultCode === 0)
        dispatch(setAuthUserData(null, null, null, false))
}
export default AuthReducer