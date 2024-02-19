import React from 'react'
import PropTypes from 'prop-types';

interface input {
  value : string,
  type : string,
  name : string,
  placeholder : string,
  onChange : any,
}

export default function Input(
  {
    value,
    type,
    name,
    placeholder,
    onChange,
  } : input
)  {
  return (

    <input 
    value={value}
    type={type} 
    placeholder={placeholder} 
    name={name}
    onChange={onChange}>
    </input>        
    )
  };


 
  