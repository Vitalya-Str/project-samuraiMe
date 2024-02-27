import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {reducer as formReducer} from 'redux-form'
import UsersReducer from "./Users-reducer.ts";
import DialogsReducer from "./Dialogs-reducer.ts";
import ProfileReducer from "./Profile-reducer.ts";
import AuthReducer from "./Auth-reducer.ts";
import thunk from "redux-thunk";
import AppReducer from "./App-reducer.ts";


const rootReducer = combineReducers({
      form: formReducer,
      profilePage: ProfileReducer,
      dialogsPage: DialogsReducer,
      usersPage: UsersReducer,
      auth: AuthReducer,
      app: AppReducer
   }
)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,  composeEnhancers(applyMiddleware(thunk)
));


export default store