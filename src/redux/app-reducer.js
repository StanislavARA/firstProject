import axios from "axios";
import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";
import { getAuthUser } from "./auth-reducer";

const SET_INITIALIZED = "SET_INITIALIZED ";

let initialState = {
    initialized: false

};


const appReducer = (state = initialState, action) => { //описывается логика редьюсера, которая произойдет при событии

    switch (action.type) {
        case SET_INITIALIZED: {
            return {
                ...state,
                initialized: true
            }
        };

        default:
            return state;
    }
};

// создаем action { type: ACTION_1, value_1: значение } для последующей передачи в диспач
export const initializedSuccess = () => ({ type: SET_INITIALIZED });


export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUser()); // здесь диспатч возвращает промис 
    Promise.all([promise])
        .then(() => { dispatch(initializedSuccess()) })

}

export default appReducer