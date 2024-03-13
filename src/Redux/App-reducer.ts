import {setAuth} from "./Auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./store";


const initialState = {
    inizialiaed: false
}
type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
    setInizialiaed: () => ({type: 'SET_INIZIALIAED'} as const)

}
const AppReducer = (state = initialState, action: ActionsType): InitialStateType => {

    if (action.type === 'SET_INIZIALIAED') {
        return {
            ...state,
            inizialiaed: true,
        }
    }
    return state
}

type ThunkActionType =  ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const setInizialiaedSucces = ():ThunkActionType => async (dispatch) => {
    const promise = dispatch(setAuth())
    Promise.all([promise]).then(() => {
        dispatch(actions.setInizialiaed())
    })

}
export default AppReducer