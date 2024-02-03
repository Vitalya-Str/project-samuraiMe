import {useState} from "react";

const ProfileStatus = (props) => {

   const [editMode, setEditMode] = useState(false)

   const [status, setStatus] = useState(props.profileStatus)

   const statusMode = (mode) => {
      setEditMode(mode)

      if (mode === false) {
         props.updateStatus(status)
      }
   }

   const setStatusProfile = (e) => {
      setStatus(e.currentTarget.value)
   }
   return (<>
      {!editMode ?
         <div>
            <span onDoubleClick={() => {
               statusMode(true)
            }}><b>Мой статус:</b> {props.profileStatus ? props.profileStatus : 'Статус отсутствует'}</span>
         </div> :
         <div>
            <input onChange={setStatusProfile} autoFocus={true} onBlur={() => {
               statusMode(false)
            }} value={status} type="text"/>
         </div>
      }


   </>)
}

export default ProfileStatus