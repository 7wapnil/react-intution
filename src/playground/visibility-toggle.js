class VisibilityToggleApp extends React.Component {
  constructor(props) {
    super(props);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.state = {
      visibility: false
    }
  }

  toggleVisibility() {
    this.setState((prevState) => {
      return {
        visibility: !prevState.visibility
      }
    });
  }
  
  render() {
    return (
      <div>
        <h1>Visibility Toggle</h1>
        <button onClick={this.toggleVisibility}>
          {this.state.visibility ? 'Hide details' : 'Show Details'}
        </button>
        {this.state.visibility && (
          <div>
            <p>Hey these are new details which you can now see..!</p>
          </div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<VisibilityToggleApp />, document.getElementById('app'))