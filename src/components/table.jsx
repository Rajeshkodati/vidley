import React from 'react';
import TableHeader from './Tableheader'
import TableBody from './TableBody';
const Table = (props) => {
    const {columns, sortColumn, onSort,  data} = props;
    return (  
            <table className="table">
                <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort}/>
                <TableBody data={data} columns={columns}/>
            </table>
);
}
 
export default Table;