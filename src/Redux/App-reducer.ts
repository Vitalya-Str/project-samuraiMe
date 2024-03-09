import {setAuth} from "./Auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";

const SET_INIZIALIAED = 'SET_INIZIALIAED'

const initialState = {
    inizialiaed: false
}
type InitialStateType = typeof initialState

type ActionsType = SetInizialiaedTypeAC
const AppReducer = (state = initialState, action: ActionsType): InitialStateType => {

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
type ThunkActionType =  ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const setInizialiaed = ():SetInizialiaedTypeAC => ({type: SET_INIZIALIAED})
export const setInizialiaedSucces = ():ThunkActionType => async (dispatch) => {
    const promise = dispatch(setAuth())
    Promise.all([promise]).then(() => {
        dispatch(setInizialiaed())
    })

}
export default AppReducer