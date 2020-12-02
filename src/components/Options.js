import React from 'react';
import Option from './Option';

const Options = (props) => (
  <div>
    <div className="widget-header">
      <h3 className="widget-header__title">Your options</h3>
      <button
        className="button button--link"
        onClick={props.handleRemoveOptions}
      >
        Remove All
      </button>
    </div>
    {props.options.length === 0 && <p className="widget__message">The options list is empty now.</p>}
    {
      props.options.map((option, index) => (
        <Option key={option}
          optionText={option}
          count={index + 1}
          handleRemoveOption={props.handleRemoveOption} />
      ))
    }
  </div>
);

export default Options;