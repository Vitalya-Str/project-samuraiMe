import s from "./Header.module.css"
import logo from './../../files/img/logo.png'
import {NavLink} from "react-router-dom";

const Header = (props) => {

   return (<header className={s.appHeader}>
      <div className={s.login}>
         <div>
            <img src={logo} alt="logo"/>

         </div>
         { props.isAuth ? props.login :  <NavLink className={s.navLogin} to={'/login'}>  -=Login=- </NavLink>

         }
      </div>

   </header>)
}

export default Header