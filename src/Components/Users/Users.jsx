import s from './Users.module.css'
import axios from "axios";
import avatar from "./../../files/img/avatar.png"

const Users = ({users, subscribeAC, unsubscribeAC, setUsersAC}) => {

   if (users.length === 0) {
      axios.get("https://social-network.samuraijs.com/api/1.0/users")
         .then(response => {
            setUsersAC(response.data.items)
         })
   }

   return (<div>
      {users.map(u =>
         <div className={s.body} key={u.id}>

            <div>
               <div><img className={s.sizePhoto} src={u.photos.small != null ? u.photos.small : avatar} alt="avatar"/>
               </div>

               <div>{u.followed ?
                  <button onClick={() => unsubscribeAC(u.id)} className={s.btn}>Unsubscribe</button> :
                  <button onClick={() => subscribeAC(u.id)} className={s.btn}>Subscribe</button>}
               </div>
            </div>


            <div className={s.box}>
               <div className={s.block}>
                  <div> {u.name}</div>
                  <div> {u.status}</div>
               </div>

               <div className={s.block}>
                  <div> {"u.location.country"}</div>
                  <div> {"u.location.city"}</div>
               </div>
            </div>

         </div>
      )}
   </div>)
}

export default Users
