
import { combineReducers, createStore } from "redux";
import dialogsReducer from "./dialogs-reducer";
import navbarReducer from "./navbar-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";

// диспач срабатывает на каждый редьюсер, передавая action { type: ACTION_1, value_1: значение }
let reducers = combineReducers({
    profilePage: profileReducer, // присваивает функцию редьюсер, содержимое с логикой которого  описана в соответствующей файле
    dialogsPage: dialogsReducer,
    navbar: navbarReducer,
    usersPage: usersReducer,

});

let store = createStore(reducers); //создает стор с данными, к которым привязывает соответствующий редьюсер





export default store;