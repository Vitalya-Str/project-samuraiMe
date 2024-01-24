const SET_AUTH_DATA = 'SET_AUTH_DATA'

const initialState = {
   id: null,
   email: null,
   login: null,
   isAuth: false

}
const AuthReducer = (state = initialState, action) => {

   if (action.type === SET_AUTH_DATA) {
      return {
         ...state,
         ...action.data,
         isAuth: true
      }
   }
   return state
}

export const setAuthUserData = (id, email, login) => ({type: SET_AUTH_DATA, id, email, login})

export default AuthReducer