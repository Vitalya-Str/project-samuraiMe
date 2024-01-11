const ADD_MESSAGE = 'ADD_MESSAGE'

const initialState = {
   message: [
      {id: 1, message: 'Hello people'},
      {id: 2, message: 'Fuck'}
   ],
   dialogs: [
      {id: '1', name: 'Vitalya'},
      {id: '2', name: 'Kama'}
   ]
}

 const DialogsReducer = (state = initialState, action) => {

   if (action.type === ADD_MESSAGE) {

      return {
         ...state,
         message: [...state.message, {id: 3, message: action.newMessagebody}]
      }
   }
   return state
}

export const addMessageCreator = (newMessagebody) => ({type: ADD_MESSAGE, newMessagebody})

export default DialogsReducer