import React from 'react';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import AddOption from './AddOption';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  };

  clearSelectedOption = () => {
    this.setState(() => ({selectedOption: undefined}));
  }

  handleRemoveOptions = () => {
    this.setState(() => ({ options: [] }));
  }

  handleRemoveOption = (optionToRemove) => {
    this.setState((prevState) => ({ options: prevState.options.filter((option) => optionToRemove !== option) }))
  }

  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    
    this.setState(() => ({selectedOption: option}));
  }

  handleAddOption = (option) => {
    if (!option) {
      return 'Option cant be empty'
    } else if (this.state.options.indexOf(option) > -1) {
      return 'Option already exists'
    }

    this.setState((prevState) => ({ options: prevState.options.concat(option) }));
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {
      // Nothing here
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  render() {
    const subtitle = 'Put your life in hand of a computer';

    return (
      <div>
        <Header subtitle={subtitle} />
          <div class="container">
            <Action
              hasOptions={this.state.options.length > 0}
              handlePick={this.handlePick}
            />
            <div className="widget">
              <Options
                options={this.state.options}
                handleRemoveOptions={this.handleRemoveOptions}
                handleRemoveOption={this.handleRemoveOption}
              />
              <AddOption handleAddOption={this.handleAddOption} />
            </div>
          </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          clearSelectedOption={this.clearSelectedOption}
        />
      </div>
    );
  }
}