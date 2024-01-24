import {combineReducers, createStore} from "redux";
import {reducer as formReducer} from 'redux-form'
import UsersReducer from "./Users-reducer";
import DialogsReducer from "./Dialogs-reducer";
import ProfileReducer from "./Profile-reducer";
import AuthReducer from "./Auth-reducer";


const rootReducer = combineReducers({
      form: formReducer,
      profilePage: ProfileReducer,
      dialogsPage: DialogsReducer,
      usersPage: UsersReducer,
      auth: AuthReducer
   }
)

const store = createStore(rootReducer)

export default store