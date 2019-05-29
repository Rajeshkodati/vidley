import React from 'react';
const Select = ({label,options,name,errors, ...rest}) => {
    return (
        <div className="form-group">
            <label htmlFor={label}>{label}</label>
            <select name={name} id={name} {...rest} className="form-control">
               <option/>
               {options.map(option => (
                   <option key={option._id} value={option}>
                   {option.name}</option>
               ))}
            </select>
            {errors && <div className="alert alert-danger">{errors}</div>}
        </div>
      );
}
 
export default Select;