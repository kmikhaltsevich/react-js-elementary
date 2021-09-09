import React from 'react'
import classes from './MyPagination.module.css'
import { usePagination } from '../../../hooks/usePagination'

const MyPagination = ({ totalPages, setPage, page }) => {
  const pagesArray = usePagination(totalPages)
  return (
    <div>
      <div className={classes.page__wrapper}>
        {
          pagesArray.map(p =>
            <span
              className={page === p ? `${classes.page} ${classes.page__current}` : classes.page}
              key={p}
              onClick={() => setPage(p)}
            >
              {p}
            </span>
          )
        }
      </div>
    </div>
  )
}

export default MyPagination
