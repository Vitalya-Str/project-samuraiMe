import {setAuth} from "./Auth-reducer";

const SET_INIZIALIAED = 'SET_INIZIALIAED'

const initialState = {
    inizialiaed: false
}
type InitialStateType = typeof initialState
const AppReducer = (state = initialState, action: any): InitialStateType => {

    if (action.type === SET_INIZIALIAED) {
        return {
            ...state,
            inizialiaed: true,
        }
    }
    return state
}
type SetInizialiaedTypeAC = {
    type: typeof SET_INIZIALIAED
}
export const setInizialiaed = ():SetInizialiaedTypeAC => ({type: SET_INIZIALIAED})
export const setInizialiaedSucces = () => (dispatch: any) => {
    const promise = dispatch(setAuth())
    Promise.all([promise]).then(() => {
        dispatch(setInizialiaed())
    })

}
export default AppReducer