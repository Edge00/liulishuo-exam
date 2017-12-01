import React, { Component } from 'react';
import './index.css'

export default class Button extends Component {
  render() {
    const classNames = this.props.className || '';
    let props = {};

    for (var key in this.props) {
      if (key !== 'children') {
        props[key] = this.props[key];
      }
    }

    return (
      <button
        {...props}
        className={`component-button ${classNames}`}
      >
        {this.props.children}
      </button>
    );

  }

}
