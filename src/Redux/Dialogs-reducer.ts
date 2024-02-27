const ADD_MESSAGE = 'ADD_MESSAGE'

type MessageType = {
    id: number
    message: string
}
type DialogType = {
    id: number
    name: string
}
const initialState = {
    message: [
        {id: 1, message: 'Hello people'},
        {id: 2, message: 'Fuck'}
    ] as Array<MessageType>,
    dialogs: [
        {id: 1, name: 'Vitalya'},
        {id: 2, name: 'Kama'}
    ] as Array<DialogType>
}
type InitialStateType = typeof initialState
const DialogsReducer = (state = initialState, action: any): InitialStateType => {

    if (action.type === ADD_MESSAGE) {

        return {
            ...state,
            message: [...state.message, {id: 3, message: action.newMessagebody}]
        }
    }
    return state
}
type AdMessageCreatorActionType = {
    type: typeof ADD_MESSAGE
    newMessagebody: string
}
export const addMessageCreator = (newMessagebody: string): AdMessageCreatorActionType => ({
    type: ADD_MESSAGE,
    newMessagebody
})

export default DialogsReducer