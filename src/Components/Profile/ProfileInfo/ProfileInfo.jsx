import Preloader from "../../../Common/Preloader/Preloader";
import avatar from './../../../files/img/avatar.png';
import s from './ProfileInfo.module.css'
import ProfileStatus from "../ProfileStatus/ProfileStatus";

const ProfileInfo = (props) => {

   if (!props.profile) {
      return <Preloader/>
   }

   return (<div>
      <img className={s.avaSize} src={props.profile.photos.large || avatar} alt='Profile img'/>

      <div><b>Name:</b> {props.profile.fullName}</div>

      <div><b>Поиск работы:</b> {props.profile.lookingForAJob ? props.profile.lookingForAJobDescription : "не ищу работу"}</div>

      <ProfileStatus profileStatus={props.profileStatus} updateStatus={props.updateStatus}/>

   </div>)
}

export default ProfileInfo