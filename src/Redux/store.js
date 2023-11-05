import {ProfileReducer} from "./Profile-reducer";
import {combineReducers, createStore} from "redux";
import {reducer as formReducer} from 'redux-form'

const rootReducer = combineReducers({
      profilePage: ProfileReducer,
      form: formReducer
   }
)

const store = createStore(rootReducer)

export default store