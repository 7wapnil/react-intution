import React from 'react';
import Option from './Option';

const Options = (props) => (
  <div>
    {props.options.length === 0 && <p>The options list is empty now.</p>}
    <button onClick={props.handleRemoveOptions}>Remove All</button>
    {
      props.options.map((option) => (
        <Option key={option}
          optionText={option}
          handleRemoveOption={props.handleRemoveOption} />
      ))
    }
  </div>
);

export default Options;