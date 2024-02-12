import s from "../Users/Users.module.css";
import {NavLink} from "react-router-dom";
import avatar from "../../files/img/avatar.png";
import React from "react";


const User = ({user,...props}) => {

  return  <div className={s.body} >
            <div>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img className={s.sizePhoto} src={user.photos.small !== null ? user.photos.small : avatar}
                             alt="avatar"/>
                    </NavLink>
                </div>

                <div>{user.followed ?
                    <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                        props.unfollow(user.id)
                    }} className={s.btn}>Unsubscribe</button> :

                    <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                        props.follow(user.id)
                    }} className={s.btn}>Subscribe</button>}
                </div>
            </div>

            <div className={s.box}>
                <div className={s.block}>
                    <div> {user.name}</div>
                    <div> {user.status}</div>
                </div>

                <div className={s.block}>
                    <div> {"user.location.country"}</div>
                    <div> {"user.location.city"}</div>
                </div>
            </div>
        </div>
    }

export default User