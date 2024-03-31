import { FC } from 'react';
import s from './DialogsItem.module.css'
import {NavLink} from "react-router-dom";

export type PropsType = {
   name: string
   id: number & HTMLAnchorElement
}

const DialogsItem: FC<PropsType> = ({name, id}) => {

   return (
      <div className={s.body}>
         <div>
            <NavLink to={id}>{name}</NavLink>
         </div>
      </div>
   )
}


export default DialogsItem