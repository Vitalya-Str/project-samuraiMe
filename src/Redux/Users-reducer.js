
const SUBSCRIBE = 'SUBSCRIBE'
const UNSUBSCRIBE = 'UNSUBSCRIBE'
const SET_USERS = 'SET_USERS'

const initialState = {
   users: [
      {
         id: 1,
         photoUrl: 'https://cdn-icons-png.flaticon.com/512/1183/1183672.png',
         subscribe: true,
         fullName: 'Alice',
         status: 'baby',
         location: {country: 'KZ', city: 'Petropavlovsk'}
      },
      {
         id: 2,
         photoUrl: 'https://cdn-icons-png.flaticon.com/512/1183/1183672.png',
         unsubscribe: false,
         fullName: 'Juliya',
         status: 'mother',
         location: {country: 'PL', city: 'Nagornoe'}
      },
      {
         id: 3,
         photoUrl: 'https://cdn-icons-png.flaticon.com/512/1183/1183672.png',
         subscribe: true,
         fullName: 'Artem',
         status: 'son',
         location: {country: 'RU', city: 'Moscow'}
      }
   ]
}
 const UsersReducer = (state = initialState, action) => {

   if (action.type === 'SUBSCRIBE') {
      return {
         ...state,
         users:
            state.users.map(u => {
               if (u.id === action.userId) {
                  return {...u.subscribe = true}
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
                  return {...u.subscribe = false}
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