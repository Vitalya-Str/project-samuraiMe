import React from "react";
import PaginatorPage from "../../Common/PaginatorPage/PaginatorPage";
import User from "../User/User";

const Users = ({totalUsersCount, pageSize, currentPage, onCurrentPage, ...props}) => {

    return (
        <div>
            <PaginatorPage totalUsersCount={totalUsersCount}
                           pageSize={pageSize}
                           currentPage={currentPage}
                           onCurrentPage={onCurrentPage}/>


            {props.users.map(u => <User user={u} id={u.id} key={u.id} {...props} />)}
        </div>
    )
}

export default Users
