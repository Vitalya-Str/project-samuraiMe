import {Field, reduxForm} from "redux-form";
import s from "./Login.module.css"
import {connect} from "react-redux";
import {postAuthLogin} from "../../Redux/Auth-reducer";
import {Navigate} from "react-router-dom";
import {Input} from "../../Common/FormControl/FormControl";
import {required} from "../../utils/validators/validators";


const Login = ({postAuthLogin, isAuth}) => {

   const onSubmit = (formData) => {
      postAuthLogin(formData.email, formData.password, formData.rememberMe, formData.captcha)

   }

   if (isAuth) {
      return <Navigate to={'/profile/'}/>
   }

   return (<div>
         <h1 className={s.login}>Login</h1>
         <LoginReduxForm onSubmit={onSubmit}/>
      </div>

   )
}

const LoginForm = (props) => {

   return (
      <form className={s.padding} onSubmit={props.handleSubmit}>
         <div className={s.fieldPadding}>
            <Field component={Input} validate={[required]} name={'email'} type={'text'} placeholder={'email'}/>
         </div>
         <div className={s.fieldPadding}>
            <Field component={Input} validate={[required]} name={'password'} type={'password'} placeholder={'password'}/>
         </div>
         <div className={s.fieldPadding}>
            <Field component={'input'} name={'remember me'} type={'checkbox'}/> Remember Me
         </div>
         <div className={s.fieldPadding}>
            <button>Log in</button>
         </div>
      </form>
   )
}

const mapStateToProps = (state) => {
   return {
      isAuth: state.auth.isAuth
   }
}

const LoginReduxForm = reduxForm({form: 'loginForm'})(LoginForm)
export default connect(mapStateToProps, {postAuthLogin})(Login)