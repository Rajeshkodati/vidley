import React from 'react';
import Joi from 'joi-browser';
import InputField from './../common/input';
import Select from './select';
class Form extends React.Component {
    state = { 
        data:{},
        errors:{}
     }
     validate = () => {
        const {error} = Joi.validate(this.state.data, this.schema, {abortEarly: false});
        if(!error) return null;

        const errors = {};
        for(let item of error.details) errors[item.path[0]] = item.message;
        return errors;
        // console.log(result);
        // const errors = {}
        // const {data} = this.state;
        // if(data.username.trim() === '')
        // errors.username = "Username is Require";
        // if(data.password.trim() === '')
        // errors.password = "Password is Require";
        // return Object.keys(errors).length === 0 ? null :errors;

    }
    validateProperty = ({name,value}) => {
        const obj = {[name]:value};
        const schema = {[name]:this.schema[name]};
        const {error} = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
        // if(name === 'username')
        //   if(value.trim() === '') return 'Username is Required';
        // if(name === 'password')
        //   if(value.trim() === '') return 'Password is Required'
    
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({errors : errors || {}});
        if(errors) return
        this.doSubmit();
    }
    
    handleChange = ({currentTarget: input}) =>{
        //multiplae form validation
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if(errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
        
        const data = {...this.state.data}
    
        data[input.name] = input.value;
        this.setState({data, errors})
        
    }
    
    renderInput = (name,label,type) => {
        const {data, errors} = this.state;
       return <InputField
                name={name}
                label={label}
                onChange={this.handleChange}
                value={data[name]}
                type={type}
                errors={errors[name]}
            />
    }
    renderSelect = (name,label,options) => {
        const {data, errors} = this.state;
       return <Select
                name={name}
                label={label}
                onChange={this.handleChange}
                value={data[name]}
                options={options}
                errors={errors[name]}
            />
    }
    renderButton = (label) => {
        return <button 
        className="btn btn-primary"
        disabled={this.validate()}>{label}</button>
    }
}


 
export default Form;