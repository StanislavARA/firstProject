import axios from "axios";
// import { stopSubmit } from "redux-form";
import {getAuthUser} from "./auth-reducer";
import {authAPI} from "../api/auth-api";
import {InferActionsTypes} from "./redux-store";


let initialState = {
    initialized: false
};

type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actionsApp>

const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => { //описывается логика редьюсера, которая произойдет при событии

    switch (action.type) {
        case 'app/SET_INITIALIZED': {
            return {
                ...state,
                initialized: true
            }
        }
            ;

        default:
            return state;
    }
};

const actionsApp = {
    initializedSuccess: () => ({type: 'app/SET_INITIALIZED'} as const),
}

// создаем action { type: ACTION_1, value_1: значение } для последующей передачи в диспач

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUser()); // здесь диспатч возвращает промис 
    Promise.all([promise])
        .then(() => {
            dispatch(actionsApp.initializedSuccess())
        })

}

export default appReducer