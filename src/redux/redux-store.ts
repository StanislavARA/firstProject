import {applyMiddleware, combineReducers, createStore, compose, Action} from "redux";
import authReducer from "./auth-reducer";
import dialogsReducer from "./dialogs-reducer";
import navbarReducer from "./navbar-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import appReducer from "./app-reducer";

// диспач срабатывает на каждый редьюсер, передавая action { type: ACTION_1, value_1: значение }
let rootReducer = combineReducers({
    profilePage: profileReducer, // присваивает функцию редьюсер, содержимое с логикой которого  описана в соответствующей файле
    dialogsPage: dialogsReducer,
    navbar: navbarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,

});

type RootReducerType = typeof rootReducer; // получается что-то вроде (globalstate: GLOBALSTATE)=> AppStateType
export type AppStateType = ReturnType<RootReducerType>// определит, то, что возвращается результатом из RootReducerType - AppStateType, который представляет из себя глобальный стейт

export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, any, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));// для работы reduxDevTools в Chrome

// let store = createStore(reducers, 
//     applyMiddleware(thunkMiddleware)); //создает стор с данными, к которым привязывает соответствующий редьюсер. 2 аргументом передали applyMiddleware(thunkMiddleware), чтобы работали thunk 


export default store;