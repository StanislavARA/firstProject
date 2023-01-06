import React, {useEffect, useState} from "react";
import s from "./Users.module.css";
import cn from "classnames"

type PropsType = {
    currentPage: number
    onPageChanged: (page:number) => void
    totalUsersCount: number
    pageSize: number
}

const Paginator: React.FC<PropsType> = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let curP = props.currentPage; // создаю карусель страниц по 8 шт
    let curPF = curP - 5 < 0 ? 0 : curP - 5;
    let curPL = curP + 5 < 10 ? 8 : curP + 3;
    let slicedPages = pages.slice(curPF, curPL);

    let portionSize = 10;
    let [portionNumber, setPortionNumber] = useState<number>(1);
    let leftPage = (portionNumber - 1) * portionSize + 1;
    let rightPage = portionNumber * portionSize;
    useEffect(
        () => setPortionNumber(Math.ceil(props.currentPage / portionSize)),
        [props.currentPage]
    );

    return (
        <div>
            <button
                onClick={() => {
                    setPortionNumber(portionNumber - 1);
                }}
            >
                Prev
            </button>
            {pages
                .filter((p) => p >= leftPage && p <= rightPage)
                .map((p) => {
                    return (
                        <span
                            className={cn(s.page, {[s.selectedPage]: props.currentPage === p})}
                            onClick={(e) => {
                                props.onPageChanged(p);
                            }}
                            key={p}
                        >
              {p}
            </span>
                    );
                })}
            <button
                onClick={() => {
                    setPortionNumber(portionNumber + 1);
                }}
            >
                Next
            </button>
        </div>
    );
};
export default Paginator;
