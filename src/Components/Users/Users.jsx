import s from './Users.module.css'

const Users = ({usersPage, subscribeAC, unsubscribeAC, setUsersAC}) => {
   console.log(usersPage)
   return (<div>
      {usersPage.users.map(u =>
         <div className={s.body} key={u.id}>

            <div >
               <div><img className={s.sizePhoto} src={u.photoUrl} alt="photo"/></div>

               <div>{u.subscribe ? <button className={s.btn}>Unsubscribe</button> :
                  <button className={s.btn}>Subscribe</button>}</div>
            </div>


            <div className={s.box}>
               <span className={s.block}>
                  <div>{u.fullName}</div>
                  <div>{u.status}</div>
               </span>

               <div className={s.block}>
                  <div>{u.location.country}</div>
                  <div>{u.location.city}</div>
               </div>
            </div>

         </div>
      )}
   </div>)
}

export default Users
