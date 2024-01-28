import s from './Users.module.css'
import avatar from "./../../files/img/avatar.png"
import React from "react";
import {NavLink} from "react-router-dom";
import axios from "axios";

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
                  <button onClick={() => {
                     axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                        {withCredentials: true})
                        .then(response => {
                           if (response.data.resultCode === 0) {
                              props.unsubscribeAC(u.id)
                           }
                        })
                  }} className={s.btn}>Unsubscribe</button> :

                  <button onClick={() => {
                     axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,{},
                        {withCredentials: true})
                        .then(response => {
                           if (response.data.resultCode === 0) {
                              props.subscribeAC(u.id)
                           }
                        })
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
