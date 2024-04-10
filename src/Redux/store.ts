import { Action, AnyAction, applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux";
import { reducer as formReducer } from 'redux-form';
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import AppReducer from "./App-reducer";
import AuthReducer from "./Auth-reducer";
import DialogsReducer from "./Dialogs-reducer";
import ProfileReducer from "./Profile-reducer";
import UsersReducer from "./Users-reducer";



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
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)
));


export default store