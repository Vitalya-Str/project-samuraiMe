const ADD_POST = 'ADD_POST'
const SET_USERS_PROFILE = 'SET_USERS_PROFILE'

const initialState = {
   posts: [
      {id: 1, message: 'Hello!', likeCount: 1},
      {id: 2, message: 'Buy', likeCount: 35}
   ],
   profile: null,
   status:""
}
const ProfileReducer = (state = initialState, action) => {
   if(action.type === ADD_POST){
      return {
         ...state,
         posts: [...state.posts, {id: 3, message: action.newPostElement, likeCount: '4'}]
      }
   }else if (action.type === SET_USERS_PROFILE){
      return {
         ...state,
         profile: action.profile
      }
   }
   return state
}

export const  addPostActionCreator = (newPostElement)=>( {type: ADD_POST, newPostElement })
export const setUsersProfile = (profile) => ({type: SET_USERS_PROFILE, profile})

export default ProfileReducer