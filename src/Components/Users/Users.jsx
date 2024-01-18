import s from './Users.module.css'
import axios from "axios";
import avatar from "./../../files/img/avatar.png"
import React from "react";

class Users extends React.Component {

   componentDidMount() {

      axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
         .then(response => {
            this.props.setUsersAC(response.data.items)
            this.props.setTotalUsersCountAC(response.data.totalCount)
         })

   }

   onCurrentPage = (pageNumber) => {

      this.props.setCurrentPageAC(pageNumber)
      axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
         .then(response => {
            this.props.setUsersAC(response.data.items)
         })
   }

   render() {

      const totalPages = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

      const pages = [];

      for (let i = 1; i <= totalPages; i++) {
         pages.push(i)
      }

      return <div>

         <div className={s.cursor}>
            {pages.map(p => {
               return <span className={this.props.currentPage === p && s.page}
                            onClick={() => {this.onCurrentPage(p)}} key={p}>{p}</span>
            })}
         </div>


         {this.props.users.map(u =>
            <div className={s.body} key={u.id}>

               <div>
                  <div><img className={s.sizePhoto} src={u.photos.small != null ? u.photos.small : avatar}
                            alt="avatar"/>
                  </div>

                  <div>{u.followed ?
                     <button onClick={() => this.props.unsubscribeAC(u.id)} className={s.btn}>Unsubscribe</button> :
                     <button onClick={() => this.props.subscribeAC(u.id)} className={s.btn}>Subscribe</button>}
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
}

export default Users
