import { FC } from 'react'
import s from './DialogsMessage.module.css'

type PropsType = {
   message: string
   id: number
}

const DialogsMessage:FC<PropsType> = ({message}) => {

   return (
      <div className={s.body}>
         <div>
            {message}
         </div>
      </div>
   )
}

export default DialogsMessage