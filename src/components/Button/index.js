import React from 'react';
import './index.css'

const Button = (props) => {
  const classNames = props.className || '';
  let componentProps = {};

  for (let key in props) {
    if (key !== 'children') {
      componentProps[key] = props[key];
    }
  }

  return (
    <button {...componentProps} className={`component-button ${classNames}`}>
      {props.children}
    </button>
  );
}

export default Button;
