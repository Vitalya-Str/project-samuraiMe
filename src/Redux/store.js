import {ProfileReducer} from "./Profile-reducer";
import {combineReducers, createStore} from "redux";
import {reducer as formReducer} from 'redux-form'
import {DialogsReducer} from "./Dialogs-reducer";

const rootReducer = combineReducers({
      form: formReducer,
      profilePage: ProfileReducer,
      dialogsPage: DialogsReducer,
   }
)

const store = createStore(rootReducer)

export default store