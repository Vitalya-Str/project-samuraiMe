const ADD_POST = 'ADD_POST'

const initialState = {
   posts: [
      {id: 1, message: 'Hello!', likeCount: 1},
      {id: 2, message: 'Buy', likeCount: 35}
   ],
   profile: null,
   status:""
}
export const ProfileReducer = (state = initialState, action) => {
   if(action.type === ADD_POST){
      return {
         ...state,
         posts: [...state.posts, {id: 3, message: action.newPostElement, likeCount: '4'}]
      }
   }

   return state
}

export const  addPostActionCreator = (newPostElement)=>( {type: ADD_POST, newPostElement })