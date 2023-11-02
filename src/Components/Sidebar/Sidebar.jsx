import {NavLink} from "react-router-dom";
import s from "./Sidebar.module.css"
const active=(navData)=> navData.isActive ? s.active : ""
const Sidebar = () => {

   return (<nav className={s.appSidebar}>
      <div>
         <NavLink to="profile" className={active} >Profile</NavLink>
      </div>
      <div>
         <NavLink to="messages" className={active} >Messages</NavLink>
      </div>
      <div>
         <NavLink to="users" className={active} >Users</NavLink>
      </div>
   </nav>)
}

export default Sidebar