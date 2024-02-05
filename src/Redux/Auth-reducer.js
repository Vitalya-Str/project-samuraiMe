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

export const setAuth = () => (dispatch) => {
   authAPI.authMe().then(data => {
      if (data.resultCode === 0) {
         const {id, email, login} = data.data
         dispatch(setAuthUserData(id, email, login, true))
      }
   })
}

export const postAuthLogin = (email, password, rememberMe, captcha) => (dispatch) => {
   authAPI.authLogin(email, password, rememberMe, captcha).then(data => {
      if (data.resultCode === 0) {
         dispatch(setAuth())
      }
   })
}

export const delLogin = () => (dispatch) => {
   authAPI.logOut().then(response => {
      if (response.data.resultCode === 0)
         dispatch(setAuth(null, null, null, false))
   })
}


export default AuthReducer