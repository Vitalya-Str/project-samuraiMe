import {applyMiddleware, combineReducers, compose} from "redux";
import {legacy_createStore as createStore} from 'redux';
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

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<InferValueTypes<T>>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)
));


export default store