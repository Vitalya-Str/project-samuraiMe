import {useState} from "react";

const ProfileStatus = (props) => {

   const [editMode, setEditMode] = useState(false)

   const statusMode = (mode) => {
      setEditMode(mode)
   }

   const setStatus = (e) => {
      props.setStatusProfile(e.target.value)
   }
   return (<>
      {!editMode ?
         <div>
            <span placeholder={'Status'} onDoubleClick={() => {
               statusMode(true)
            }}>{props.status ? props.status : 'Статус отсутствует'}</span>
         </div> :
         <div>
            <input onChange={(e) => {
               setStatus(e)
            }} autoFocus onBlur={() => {
               statusMode(false)
            }} value={props.status} type="text"/>
         </div>
      }


   </>)
}

export default ProfileStatus