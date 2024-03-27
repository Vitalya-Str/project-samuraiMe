import s from "./Header.module.css"
import logo from './../../files/img/logo.png'
import {NavLink} from "react-router-dom";
import { FC } from "react";

type PropsType = {
   login: string
   delLogin: ()=> void
   isAuth: boolean
}

const Header: FC<PropsType> = (props) => {

   const loginOut = ()=>{
      props.delLogin()
   }

   return (<header className={s.appHeader}>
      <div className={s.login}>
         <div>
            <img src={logo} alt="logo"/>

         </div>
         {props.isAuth ? <div> {props.login} <button onClick={()=>{loginOut()}}> Log out</button></div>
            : <NavLink className={s.navLogin} to={'/login'}> -=Login=- </NavLink>
         }
      </div>

   </header>)
}

export default Header