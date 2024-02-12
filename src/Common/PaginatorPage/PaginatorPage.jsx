import s from "../../Components/Users/Users.module.css";
import React from "react";


const PaginatorPage = ({totalUsersCount, pageSize, currentPage, onCurrentPage}) => {
    const totalPages = Math.ceil(totalUsersCount / pageSize);

    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }

    return (
        <div className={s.cursor}>
            {pages.map(p => {
                return <span className={currentPage === p && s.page}
                             onClick={() => {
                                 onCurrentPage(p)
                             }} key={p}>{p}</span>
            })}
        </div>
    )
}
export default PaginatorPage