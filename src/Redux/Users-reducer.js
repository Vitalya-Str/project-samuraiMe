const SUBSCRIBE = 'SUBSCRIBE'
const UNSUBSCRIBE = 'UNSUBSCRIBE'
const SET_USERS = 'SET_USERS'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'

const initialState = {
   users: [],
   pageSize: 10,
   totalUsersCount: 0,
   currentPage: 1,
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
      return {...state, users: action.users}

   } else if (action.type === 'SET_TOTAL_USERS_COUNT') {
      return {...state, totalUsersCount: action.totalUsersCount}

   }else if (action.type === 'SET_CURRENT_PAGE') {
      return {...state, currentPage: action.currentPage}

   }

   return state

}

export const subscribeAC = (userId) => ({type: 'SUBSCRIBE', userId})

export const unsubscribeAC = (userId) => ({type: 'UNSUBSCRIBE', userId})

export const setUsersAC = (users) => ({type: 'SET_USERS', users})

export const  setTotalUsersCountAC = (totalUsersCount) => ({type:'SET_TOTAL_USERS_COUNT', totalUsersCount})

export const setCurrentPageAC = (currentPage) => ({type:'SET_CURRENT_PAGE', currentPage})

export default UsersReducer