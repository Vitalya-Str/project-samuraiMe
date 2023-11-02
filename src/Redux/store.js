import {ProfileReducer} from "./Profile-reducer";
import {combineReducers, createStore} from "redux";

const rootReducer = combineReducers({
      profilePage: ProfileReducer,
   }
)

const  store = createStore(rootReducer)

export default store