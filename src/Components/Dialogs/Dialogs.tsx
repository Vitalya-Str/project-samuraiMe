import DialogsItem from "./DialogsItem/DialogsItem";
import DialogsMessage from "./DialogsMessage/DialogsMessage";
import s from './Dialogs.module.css'
import {Field,  reduxForm} from "redux-form";
import {Textarea} from "../../Common/FormControl/FormControl";
import {required} from "../../utils/validators/validators";
import { FC } from "react";
import { DialogType, MessageType } from "../../types/types";

interface PropsType  {
   dialogsPage: {
      dialogs:DialogType[] 
      message: MessageType[]
   }
   addMessageCreator: (addMessage: string)=> void
}

const Dialogs: FC<PropsType> = ({dialogsPage, addMessageCreator}) => {

   const dialogElement = dialogsPage.dialogs.map(d => <DialogsItem id={d.id} name={d.name} key={d.id}/>)
   const dialogMessage = dialogsPage.message.map(m => <DialogsMessage id={m.id} message={m.message} key={m.id}/>)

   const addMessage = (value: { addMessage: string; }) => {
      addMessageCreator(value.addMessage)
   }

   return (
      <div>
         <div className={s.body}>
            <div>
               {dialogElement}
            </div>
            <div>
               {dialogMessage}
               <div className={s.textarea}>
                  <AddMessageFormRedux onSubmit={addMessage}/>
               </div>
            </div>
         </div>
      </div>
   )
}

type AddMessageFormType = {
   handleSubmit:  any
}

const AddMessageForm:FC<AddMessageFormType> = (props) => {

   return (
      <form onSubmit={props.handleSubmit}>
         <div>
            <Field component={Textarea} validate={[required]} name='addMessage' placeholder='Message Input'/>
         </div>
         <div>
            <button className={s.btn}>Add Message</button>
         </div>
      </form>
   )
}
 


const AddMessageFormRedux = reduxForm({form: 'AddMessageForm'})(AddMessageForm)

export default Dialogs