import s from './DialogsItem.module.css'
import {NavLink} from "react-router-dom";

const DialogsItem = ({name, id}) => {

   return (
      <div className={s.body}>
         <div>
            <NavLink to={id}>{name}</NavLink>
         </div>
      </div>
   )
}


export default DialogsItem