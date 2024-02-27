import {authAPI, securityAPI} from "../api/api";

const SET_AUTH_DATA = 'SET_AUTH_DATA'
const SET_CAPTCHA_SACCESS = 'SET_CAPTCHA_SACCESS'

const initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    rememberMe: null as boolean | null,
    isAuth: false,
    captcha: null as string | null
}
type InitialStateType = typeof initialState
const AuthReducer = (state = initialState, action: any): InitialStateType => {

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
type SetAuthUserDataActionType = {
    type: typeof SET_AUTH_DATA
    data: {
        id: number
        email: string
        login: string
        isAuth: boolean
    }
}
export const setAuthUserData = (id: number, email: string, login: string, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_AUTH_DATA,
    data: {id, email, login, isAuth}
})
type SetCaptchaSaccessActionType = {
    type: typeof SET_CAPTCHA_SACCESS
    captcha: string
}
export const setCaptchaSaccess = (captcha: string):SetCaptchaSaccessActionType => ({type: SET_CAPTCHA_SACCESS, captcha})

export const setAuth = () => async (dispatch: any) => {
    const data = await authAPI.authMe()
    if (data.resultCode === 0) {
        const {id, email, login} = data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}
export const postAuthLogin = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    const response = await authAPI.authLogin(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(setAuth())
    } else if (response.data.resultCode === 10) {
        dispatch(getCaptchaURL())
    }

}
export const getCaptchaURL = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl()
    dispatch(setCaptchaSaccess(response.data.url))
}
export const delLogin = () => async (dispatch: any) => {
    const response = await authAPI.logOut()
    if (response.data.resultCode === 0)
        dispatch(setAuthUserData(null, null, null, false))
}
export default AuthReducer