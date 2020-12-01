import React from 'react';
import ReactDOM from 'react-dom';
import IndecisionApp from './components/IndecisionApp';
import './styles/style.scss'

ReactDOM.render(<IndecisionApp options = {['First', 'Last']} />, document.getElementById('app'));