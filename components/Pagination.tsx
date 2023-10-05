// import * as React from 'react'
// import Pagination from '@mui/material/Pagination';
// import { Button } from '@mui/material';

// const Paginate = ({totalPosts, postPerpage}:any) => {
//     let pages = [];

//     for(let i = 1; i<= Math.ceil(totalPosts/postPerpage) ; i++){
//         pages.push(i)
//     }
//   return (
//     <div>
//         {
            
//             pages.map((page, index) => {
//                return <Button style={{color:'black'}} key={index}>{page}</Button>;
//             })
//         }
//     </div>
//   )
// }

// export default Paginate

import React from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'

Pagination.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
    onPageChange: null,
};

function Pagination(props:any) {
    const {pagination, onPageChange} = props;
    const {_page, _limit, _totalRows} = pagination;
    const totalPages = Math.ceil(_totalRows/_limit);

    function handlePageChange(newPage:any) {
        if (onPageChange) {
            onPageChange(newPage);
        }
    }
  return (
    <>
    <Button
    disabled = {_page <= 1 }
    onClick={() => handlePageChange(_page - 1)}
    >
        Previous
    </Button>

    <Button
    disabled = {_page >=  totalPages }
    onClick={() => handlePageChange(_page + 1)}
    >
        Next
    </Button>
</>
  )
}



export default Pagination
