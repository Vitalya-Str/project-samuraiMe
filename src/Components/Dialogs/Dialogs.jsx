import DialogsItem from "./DialogsItem/DialogsItem";
import DialogsMessage from "./DialogsMessage/DialogsMessage";
import s from './Dialogs.module.css'
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../Common/FormControl/FormControl";
import {addMessageCreator} from "../../Redux/Dialogs-reducer";
import {required} from "../../utils/validators/validators";


const Dialogs = ({dialogsPage}) => {
   const state = dialogsPage

   const dialogElement = state.dialogs.map(d => <DialogsItem id={d.id} name={d.name} key={d.id}/>)
   const dialogMessage = state.message.map(m => <DialogsMessage id={m.id} message={m.message} key={m.id}/>)

   const addMessage = (value) => {
      console.log(value)
      addMessageCreator(value.newPostElement)
   }

   return (
      <div>

         <div className={s.body}>
            <div>
               {dialogElement}
            </div>
            <div>
               {dialogMessage}
            </div>
         </div>
         <AddMessageFormRedux onSubmit={addMessage}/>
      </div>
   )
}

const AddMessageForm = (props) => {

   return (
      <form onSubmit={props.handleSubmit}>
         <div>
            <Field component={Textarea} validate={[required]} name='AddMessageForm' placeholder='Message Input'/>
         </div>
         <div>
            <button>Add Message</button>
         </div>
      </form>
   )
}

const AddMessageFormRedux = reduxForm({form: 'AddMessageForm'})(AddMessageForm)

export default Dialogs