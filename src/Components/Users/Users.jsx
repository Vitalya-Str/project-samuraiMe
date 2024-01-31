import s from './Users.module.css'
import avatar from "./../../files/img/avatar.png"
import React from "react";
import {NavLink} from "react-router-dom";

const Users = (props) => {
   const totalPages = Math.ceil(props.totalUsersCount / props.pageSize);

   const pages = [];

   for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
   }

   return <div>

      <div className={s.cursor}>
         {pages.map(p => {
            return <span className={props.currentPage === p && s.page}
                         onClick={() => {
                            props.onCurrentPage(p)
                         }} key={p}>{p}</span>
         })}
      </div>


      {props.users.map(u =>
         <div className={s.body} key={u.id}>

            <div>
               <div>
                  <NavLink to={'/profile/' + u.id}>
                     <img className={s.sizePhoto} src={u.photos.small != null ? u.photos.small : avatar}
                          alt="avatar"/>
                  </NavLink>
               </div>


               <div>{u.followed ?
                  <button  disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                     props.unfollow(u.id)
                  }} className={s.btn}>Unsubscribe</button> :

                  <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                     props.follow(u.id)
                  }} className={s.btn}>Subscribe</button>}
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
   </div>

}

export default Users
