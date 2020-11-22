import React from 'react'
import ReactDOM from 'react-dom'

class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    };
    this.handleRemoveOptions = this.handleRemoveOptions.bind(this);
    this.handleRemoveOption = this.handleRemoveOption.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
  
      if(options) {
        this.setState(() => ({options}));
      }
    } catch(e) {
      // Nothing here
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  handleRemoveOptions() {
    this.setState(() => ({options: []}));
  }

  handleRemoveOption(optionToRemove) {
    this.setState((prevState) => ({options: prevState.options.filter((option) => optionToRemove !== option)}))
  }

  handleAddOption(option) {
    this.setState((prevState) => ({options: prevState.options.concat(option)}));
  }

  render() {
    const subtitle = 'Put your life in hand of a computer';

    return (
      <div>
        <Header subtitle = {subtitle} />
        <Action
          hasOptions = {this.state.options.length > 0}
          handlePick = {this.handlePick}
        />
        <Options
          options = {this.state.options}
          handleRemoveOptions = {this.handleRemoveOptions}
          handleRemoveOption = {this.handleRemoveOption}
        />
        <AddOption handleAddOption = {this.handleAddOption} />
      </div>
    );
  }
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.subtitle}</h2>
    </div>
  );
}

Header.defaultProps = {
  title: 'Indecision'
}

const Action = (props) => {
  return (
    <div>
      <button
        disabled={!props.hasOptions}
        onClick={props.handlePick}
      >
        What should I do?
      </button>
    </div>
  );
}

const Options = (props) => {
  return (
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
}

const Option = (props) => {
  return (
    <div>
      {props.optionText}
      <button
        onClick={(e) => {
          props.handleRemoveOption(props.optionText);
        }}
      >
        Remove
      </button>
    </div>
  );
}

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    }
  }

  handleAddOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));

    if(!error) {
      e.target.elements.option.value = '';
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.createElementById('app'));
