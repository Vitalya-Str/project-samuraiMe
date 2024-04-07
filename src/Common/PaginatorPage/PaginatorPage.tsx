import s from './PaginatorPage.module.css';
import {FC, useState} from "react";
import cn from 'classnames'

type PaginatorPageType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onCurrentPage: (pageNumber: number) => void
    portionSize?:  number
}
const PaginatorPage: FC<PaginatorPageType> = ({
                                                  totalItemsCount,
                                                  pageSize,
                                                  currentPage,
                                                  onCurrentPage,
                                                  portionSize = 10
                                              }) => {
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
                    return <span className={cn({[s.selectedPage]: currentPage === p}, s.pageNumber)}
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