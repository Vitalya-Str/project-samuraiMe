import s from "./Header.module.css"
import logo from './../../files/img/logo.png'

const Header = () => {

   return (<header className={s.appHeader}>
      <img  src={logo} alt="logo"/>
   </header>)
}

export default Header