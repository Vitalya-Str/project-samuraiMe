import s from "./PaginatorPage.module.css";
import React, {useState} from "react";
import cn from 'classnames'


const PaginatorPage = ({totalItemsCount, pageSize, currentPage, onCurrentPage, portionsSize: portionSize = 10}) => {
    const pagesCount = Math.ceil(totalItemsCount / pageSize);

    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionsCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * (portionSize + 1)
    const rightPortionPageNumber = portionNumber * portionSize

    return (
        <div className={s.paginator}>
            {portionNumber > 1 &&
                <button onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}>PREV</button>}
            {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span className={cn({[s.selectedPage]: currentPage === p} , s.pageNumber)}
                                 onClick={() => {
                                     onCurrentPage(p)
                                 }} key={p}>{p}</span>
                })}
            {portionsCount > portionNumber &&
                <button onClick={() => {
                    setPortionNumber(portionNumber + 1)
                }}>NEXT</button>}
        </div>
    )
}
export default PaginatorPage