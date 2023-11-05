import s from './DialogsMessage.module.css'

const DialogsMessage = ({message}) => {

   return (
      <div className={s.body}>
         <div>
            {message}
         </div>
      </div>
   )
}

export default DialogsMessage