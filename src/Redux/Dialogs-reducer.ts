import { DialogType, MessageType } from "../types/types";
import {InferActionsTypes} from "./store";


const initialState = {
    message: [
        {id: 1, message: 'Hello people'},
        {id: 2, message: 'Fuck'}
    ] as MessageType[],
    dialogs: [
        {id: 1, name: 'Vitalya'},
        {id: 2, name: 'Kama'}
    ] as DialogType[],
    newMessagebody: ''
}
type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
    addMessageCreator: (newMessagebody: string) => ({type: 'ADD_MESSAGE', newMessagebody} as const)
}
const DialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    if (action.type === 'ADD_MESSAGE') {
        return {
            ...state,
            message: [...state.message, {id: 3, message: action.newMessagebody}]
        }
    }
    return state
}
export default DialogsReducer