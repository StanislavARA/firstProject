
import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import authReducer from "./auth-reducer";
import dialogsReducer from "./dialogs-reducer";
import navbarReducer from "./navbar-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import appReducer from "./app-reducer";

// диспач срабатывает на каждый редьюсер, передавая action { type: ACTION_1, value_1: значение }
let reducers = combineReducers({
    profilePage: profileReducer, // присваивает функцию редьюсер, содержимое с логикой которого  описана в соответствующей файле
    dialogsPage: dialogsReducer,
    navbar: navbarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,

});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));// для работы reduxDevTools в Chrome

// let store = createStore(reducers, 
//     applyMiddleware(thunkMiddleware)); //создает стор с данными, к которым привязывает соответствующий редьюсер. 2 аргументом передали applyMiddleware(thunkMiddleware), чтобы работали thunk 





export default store;