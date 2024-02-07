import {applyMiddleware, combineReducers, createStore} from "redux";
import {reducer as formReducer} from 'redux-form'
import UsersReducer from "./Users-reducer";
import DialogsReducer from "./Dialogs-reducer";
import ProfileReducer from "./Profile-reducer";
import AuthReducer from "./Auth-reducer";
import thunk from "redux-thunk";
import AppReducer from "./App-reducer";


const rootReducer = combineReducers({
      form: formReducer,
      profilePage: ProfileReducer,
      dialogsPage: DialogsReducer,
      usersPage: UsersReducer,
      auth: AuthReducer,
      app: AppReducer
   }
)

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store