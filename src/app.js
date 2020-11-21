class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.options
    };
    this.handleRemoveOptions = this.handleRemoveOptions.bind(this);
    this.handleRemoveOption = this.handleRemoveOption.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
  }

  handleRemoveOptions() {
    this.setState(() => ({options: []}));
  }

  handleRemoveOption(optionToRemove) {
    this.setState((prevState) => ({options: prevState.options.filter((option) => optionToRemove !== option)}))
  }

  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }

  handleAddOption(option) {
    if(!option) {
      return 'Option cant be empty'
    } else if(this.state.options.indexOf(option) > -1) {
      return 'Option already exists'
    }

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

IndecisionApp.defaultProps = {
  options: []
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

ReactDOM.render(<IndecisionApp options = {['First', 'Last']} />, document.getElementById('app'));