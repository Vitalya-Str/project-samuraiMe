import Preloader from "../../../Common/Preloader/Preloader";
import avatar from './../../../files/img/avatar.png'

const ProfileInfo = (props) => {

   if (!props.profile) {
      return <Preloader/>
   }

   return (<div>
      <img src={props.profile.photos.large ? props.profile.photos.large : avatar} alt='Profile img'/>
      <div><b>Name:</b> {props.profile.fullName}</div>
      <div>{props.profile.lookingForAJob}</div>
      <div><b>Поиск работы:</b> {props.profile.lookingForAJobDescription}</div>
      <div><b>Status:</b> {props.profile.aboutMe}</div>
   </div>)
}

export default ProfileInfo