import React from 'react';
const ListGroup = (props) => {
    const{items, itemSelected,textProperty,valueProperty,selectedItem} = props
    return <ul className="list-group" style={{cursor:'pointer'}}>
          {items.map( item => (<li className={item === selectedItem ? "list-group-item active" 
          : "list-group-item"}
           key={item[valueProperty]} 
           onClick={() => itemSelected(item)}>
           {item[textProperty]}</li>)   )}
        
    </ul>
}
ListGroup.defaultProps = {
    valueProperty: "_id",
    textProperty: 'name'
} 
export default ListGroup;