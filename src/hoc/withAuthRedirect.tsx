import React from "react";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {AppStateType} from "../redux/redux-store";


let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
});

type MapPropsType = ReturnType<typeof mapStateToPropsForRedirect>
type DispatchPropsType = {}

export function  withAuthRedirectComponent<T>(Component: React.ComponentType<T>) {

    const RedirectComponent: React.FC <MapPropsType & DispatchPropsType> = (props) =>{
        let {isAuth, ...restProps} = props

        if (!isAuth) {
            return <Navigate to={"/login"}/>;
        } // если не залогинен, перенаправляет на страничку логин
        //@ts-ignore
        return <Component {...restProps} />
    }

    let ConnectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, T, AppStateType>(mapStateToPropsForRedirect, {})(RedirectComponent)

    return ConnectedAuthRedirectComponent
}