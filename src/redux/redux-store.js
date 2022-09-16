
import { combineReducers, createStore } from "redux";
import dialogsReducer from "./dialogs-reducer";
import navbarReducer from "./navbar-reducer";
import profileReducer from "./profile-reducer";

// диспач срабатывает на каждый редьюсер, передавая action { type: ACTION_1, value_1: значение }
let reducers = combineReducers({
    profilePage: profileReducer, // вызывается функция, логика которой описана в соответствующей файле
    dialogsPage: dialogsReducer,
    navbar: navbarReducer,

});

let store = createStore(reducers); //создает стор с данными, к которым привязывает соответствующий редьюсер





export default store;