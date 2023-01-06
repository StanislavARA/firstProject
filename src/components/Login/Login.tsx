import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {login} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {Input} from "../common/FormsControls/FormsControls";
import {requiredField} from "../../utils/validators/validators";
import {Navigate} from "react-router-dom";
// @ts-ignore
import s from "../common/FormsControls/FormsControls.module.css";
import {AppStateType} from "../../redux/redux-store";

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}


type LoginFormOwnProps = {
    captchaURL: string | null
}
const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = (props) => {
    // п.2 компонента должна получить в пропсы onSubmit = ф-ия, которая прокинется в props.handleSubmit
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    placeholder="Email"
                    name="email"
                    component={Input}
                    validate={[requiredField]}
                />
            </div>
            <div>
                <Field
                    placeholder="Password"
                    name="password"
                    component={Input}
                    validate={[requiredField]}
                    type="password"
                />
            </div>
            <div>
                <Field component="input" name="rememberMe" type="checkbox"/> remember
                me
            </div>
            {props.captchaURL && (<div>
                <div><img src={props.captchaURL}/></div>
                <Field component="input" name="captcha" validate={[requiredField]}/></div>)}
            {props.error && <div className={s.formSummaryError}>{props.error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: "Login"})(LoginForm);

type MapStatePropsType = {
    isAuth: boolean,
    captchaURL: string | null,
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: any) => void
}

const LoginPage: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        // п.3 в formData попадает объект с данными из формы при сабмите
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);

    };

    if (props.isAuth) {
        return <Navigate to={"/profile"}/>;
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaURL={props.captchaURL}/>
        </div> // п.1 передаем через пропсы в форму LoginReduxForm onSubmit="наша ф-ия" для п.2
    );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captchaURL: state.auth.captchaURL,
});

export default connect(mapStateToProps, {login})(LoginPage);
