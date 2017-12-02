import React from 'react';
import './index.css'

const Button = (props) => {
  const classNames = props.className || '';
  let componrntProps = {};

  for (let key in props) {
    if (key !== 'children') {
      componrntProps[key] = props[key];
    }
  }

  return (
    <button {...componrntProps} className={`component-button ${classNames}`}>
      {props.children}
    </button>
  );
}

export default Button;
