import {setAuth} from "./Auth-reducer";

const SET_INIZIALIAED = 'SET_INIZIALIAED'

const initialState = {
   inizialiaed: false

}
const AppReducer = (state = initialState, action) => {

   if (action.type === SET_INIZIALIAED) {
      return {
         ...state,
         inizialiaed: true,
      }
   }

   return state
}

export const setInizialiaed = () => ({type: SET_INIZIALIAED})

export const setInizialiaedSucces = () => (dispatch) => {
   const promise = dispatch(setAuth())
   Promise.all([promise]).then(() => {
      dispatch(setInizialiaed())
   })

}


export default AppReducer