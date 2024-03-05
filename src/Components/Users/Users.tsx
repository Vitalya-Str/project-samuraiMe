import  {FC} from "react";
import PaginatorPage from "../../Common/PaginatorPage/PaginatorPage";
import User from "../User/User";
import {UserType} from "../../types/types";

type TypeProps = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onCurrentPage: (pageNumber: number) => void
    users: UserType[]
    followingInProgress: number[]
    unfollow: (userID: number) => void
    follow: (userID: number) => void
}
const Users: FC<TypeProps> = ({totalItemsCount, pageSize, currentPage, onCurrentPage, ...props}) => {

    return (
        <div>
            <PaginatorPage totalItemsCount={totalItemsCount}
                           pageSize={pageSize}
                           currentPage={currentPage}
                           onCurrentPage={onCurrentPage}/>


            {props.users.map(u => <User user={u} id={u.id} key={u.id} {...props} />)}
        </div>
    )
}

export default Users
