
const SUBSCRIBE = 'SUBSCRIBE'
const UNSUBSCRIBE = 'UNSUBSCRIBE'
const SET_USERS = 'SET_USERS'

const initialState = {
   users: []
}
 const UsersReducer = (state = initialState, action) => {

   if (action.type === 'SUBSCRIBE') {
      return {
         ...state,
         users:
            state.users.map(u => {
               if (u.id === action.userId) {
                  return {...u, followed: true}
               }
               return u
            })

      }
   } else if (action.type === 'UNSUBSCRIBE') {
      return {
         ...state,
         users:
            state.users.map(u => {
               if (u.id === action.userId) {
                  return {...u, followed: false}
               }
               return u
            })

      }
   } else if (action.type === 'SET_USERS') {
      return {...state, users: [...state.users, ...action.users]}
   }

   return state

}

export const subscribeAC = (userId) => ({type: 'SUBSCRIBE', userId})

export const unsubscribeAC = (userId) => ({type: 'UNSUBSCRIBE', userId})

export const setUsersAC = (users) => ({type: 'SET_USERS', users})

export default UsersReducer