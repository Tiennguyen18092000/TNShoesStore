// // import React, { useEffect, useState } from "react";


// // import { collection, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
// // import { db } from '../config/firebase';

// // const Filter = ({ filter, changeProducts }: any) => {
// //   const key = Object.keys(filter);
// //   const arr = Object.values(filter)[0] as any;
// // }
 
// // export const Filters = ({ changeProducts }:any) => {
// //   const [filters, setFilters] = useState(null) as any;
// //   useEffect(()=>{
// //     onSnapshot(
// //       collection(db, "filter"),
// //       (snapShot) => {
// //           let list = [] as any;
// //           snapShot.docs.forEach((doc) => {
// //               list.push({...doc.data()});
// //           });
// //           setFilters(list);
// //       },
// //       (error) => {
// //           console.log(error);
// //       }
// //   );
// //   },[])
// //   // console.log("day la filter",filters)
// //   return (
// //     <div style={{marginLeft:'20%'}}>
// //     <h1 className="text-2xl">Filters</h1>
// //     {filters?.map((filter:any, index:any) => (
// //       <Filters key={index} filter={filter} changeProducts={changeProducts} />
// //     ))}
// //   </div>
// //   )
// // }

import React, { use, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Input } from '@mui/material';

Filters.propTypes = {
    onsubmit: PropTypes.func
};
Filters.defaultProps = {
    onsubmit : null,
};
function Filters(props:any) {
    const {onsubmit} = props
    const [searchTerm, setSearchTerm]= useState('');
    const typingTimeoutRef:any = useRef(null);
 function handleSearchTermChange(e:any){
    const value = e.target.value;
    setSearchTerm(value);
    if(!onsubmit) return;
    if(typingTimeoutRef.current){
        clearTimeout(typingTimeoutRef.current)
    }
    typingTimeoutRef.current = setTimeout(() => {
    const FormValues = {
        searchTerm: e.target.value,
    };
    onsubmit(FormValues)
}, 300);
}
  return (
    <Input
        placeholder='Search'
        value={searchTerm}
        onChange={handleSearchTermChange}
        style={{width:'400px'}}                               
    />
  )
}

