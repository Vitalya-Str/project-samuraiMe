import {Field, InjectedFormProps, reduxForm} from "redux-form";
import s from "./Login.module.css"
import {connect} from "react-redux";
import {postAuthLogin} from "../../Redux/Auth-reducer";
import {Navigate} from "react-router-dom";
import {Input} from "../../Common/FormControl/FormControl";
import {required} from "../../utils/validators/validators";
import {AppStateType} from "../../Redux/store";
import {FC} from "react";

type MapStateType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchType = {
    postAuthLogin: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type LoginFormValuesTypes = {
    captcha: string | null
    rememberMe: boolean
    password: string
    email: string
}
const Login: FC<MapStateType & MapDispatchType> = ({postAuthLogin, isAuth, captchaUrl}) => {
    const onSubmit = (formData: LoginFormValuesTypes) => {
        postAuthLogin(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (isAuth) {
        return <Navigate to={'/profile/'}/>
    }

    return (<div>
            <h1 className={s.login}>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>

    )
}
type LoginOwnType = {
    captchaUrl: string | null
}
const LoginForm: FC<InjectedFormProps<LoginFormValuesTypes , LoginOwnType> & LoginOwnType> = (props) => {

    return (
        <form className={s.padding} onSubmit={props.handleSubmit}>

            <div className={s.fieldPadding}>
                <Field component={Input} validate={[required]} name={'email'} type={'text'} placeholder={'email'}/>
            </div>

            <div className={s.fieldPadding}>
                <Field component={Input} validate={[required]} name={'password'} type={'password'}
                       placeholder={'password'}/>
            </div>

            <div className={s.fieldPadding}>
                <Field component={'input'} name={'remember me'} type={'checkbox'}/> Remember Me
            </div>

            {props.captchaUrl && <img src={props.captchaUrl} alt="captcha"/>}
            {props.captchaUrl &&
                <div className={s.fieldPadding}>
                    <Field component={'input'} validate={[required]} name={'captcha'} type={'text'}/>
                </div>}

            <div className={s.fieldPadding}>
                <button>Log in</button>
            </div>
        </form>
    )
}

const mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        captchaUrl: state.auth.captcha,
        isAuth: state.auth.isAuth
    }
}

const LoginReduxForm = reduxForm<LoginFormValuesTypes, LoginOwnType>({form: 'loginForm'})(LoginForm)
export default connect(mapStateToProps, {postAuthLogin})(Login)