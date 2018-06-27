import React, { Component } from 'react';
import styled from 'styled-components';
import '../App.css';

import Input from './Input';
import Keypad from './Keypad';

const Wrapper = styled.div`
  width: 100%;
  max-width: 360px;
  height: 600px;
  margin: auto;
  background: black;
  padding: 10px;
  @media (min-width: 680px) {
    margin-top: 40px;
  }
`;
class App extends Component {
  constructor() {
    super();

    this.state = {
      input: 0,
      savedInput: '',
      factor: '',
      operation: ''
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.calculate = this.calculate.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.clear = this.clear.bind(this);
    this.plusOrMinus = this.plusOrMinus.bind(this);
    this.percent = this.percent.bind(this);
    this.clickNumber = this.clickNumber.bind(this);
  }

  handleKeyDown() {
    document.body.addEventListener('keydown', e => {
      e.preventDefault();

      if (e.key.match('Escape')) {
        this.clear();
      }

      this.setOperation(e.key);

      if (
        e.key.match(/[0-9]|\.|Backspace/) &&
        !this.state.operation &&
        this.state.input.toString().length <= 8
      ) {
        let input = this.state.input.toString();
        let savedInput = this.state.savedInput.toString();

        if (e.key.match('Backspace')) {
          input = input.toString().slice(0, -1);
          this.setState({ input, savedInput: input });
        }

        if (e.key.match(/\./)) {
          input = input.toString() + e.key;
          console.log(input + e.key);
          this.setState({ input });
          return;
        }
        input = input + e.key;
        this.setState({
          input: parseFloat(input, 10) || 0,
          savedInput: parseFloat(input, 10) || 0
        });
      }

      if (
        e.key.match(/[0-9]|\.|Backspace/) &&
        this.state.operation &&
        this.state.factor.toString().length <= 8
      ) {
        let factor = this.state.factor.toString();

        if (e.key.match('Backspace')) {
          factor = this.state.factor;
          factor = factor.toString().slice(0, -1);
          this.setState({ factor });
        }

        if (e.key.match(/\./)) {
          factor = factor.toString() + e.key;
          console.log(factor + e.key);
          this.setState({ factor });
          return;
        }

        this.setState({ factor: parseFloat(factor + e.key, 10) });
      }
    });

    document.body.addEventListener('keydown', e => {
      if (e.key.match(/=|Enter/)) {
        this.calculate();
      }
    });
  }

  setOperation(button) {
    if (button === '/') {
      if (this.state.operation) {
        if (this.state.factor) {
          this.calculate();
        }
        if (this.state.operation === '/') return;
        this.setState({ operation: '/' });
        return;
      }
      // this.calculate();
      this.setState({ operation: '/' });
    }
    if (button === '*') {
      if (this.state.operation) {
        if (this.state.factor) {
          this.calculate();
        }
        if (this.state.operation === '*') return;
        this.setState({ operation: '*' });
        return;
      }

      // this.calculate();
      this.setState({ operation: '*' });
    }
    if (button === '-') {
      if (this.state.operation) {
        if (this.state.factor) {
          this.calculate();
        }
        if (this.state.operation === '-') return;
        this.setState({ operation: '-' });
        return;
      }
      // this.calculate();
      this.setState({ operation: '-' });
    }
    if (button === '+') {
      if (this.state.operation) {
        if (this.state.factor) {
          this.calculate();
        }
        if (this.state.operation === '') return;
        this.setState({ operation: '+' });
        return;
      }
      // this.calculate();
      this.setState({ operation: '+' });
    }
  }

  clear() {
    this.setState({ input: 0, factor: '', operation: '', savedInput: '' });
  }

  plusOrMinus() {
    const input = this.state.input;
    const factor = this.state.factor;
    const operation = this.state.operation;
    if (!factor && !operation) {
      if (input === 0) {
        this.setState({ input: '-' + input });
      } else {
        this.setState({ input: input * -1 });
      }
    }
    if (!factor && operation) {
      this.setState({ factor: '-' });
    } else {
      if (factor === 0) {
        this.setState({ factor: '-' + factor });
      } else {
        this.setState({ factor: factor * -1 });
      }
    }
  }

  percent() {
    const input = this.state.input;
    const savedInput = this.state.savedInput;
    const factor = this.state.factor;
    if (!factor)
      this.setState({ input: input * 0.01, savedInput: input * 0.01 });
    if (factor) this.setState({ factor: factor * 0.01 });
  }

  clickNumber(number) {
    let input = this.state.input;
    let factor = this.state.factor;
    let savedInput = this.state.savedInput;

    number = number.toString();
    if (!this.state.operation && this.state.input.toString().length <= 8) {
      if (number === '.') {
        let input = this.state.input;
        input = input.toString() + number;
        console.log(input + number);
        this.setState({ input });
        return;
      }
      input = input + number;
      this.setState({
        input: parseFloat(input, 10) || 0,
        savedInput: parseFloat(input, 10) || 0
      });
    }

    if (this.state.operation && this.state.factor.toString().length <= 8) {
      if (number === '.') {
        let factor = this.state.factor;
        factor = factor.toString() + number;
        console.log(factor + number);
        this.setState({ factor });
        return;
      }
      factor = factor + number;
      this.setState({ factor: parseFloat(factor, 10) });
    }
  }

  calculate() {
    const firstInput = this.state.input;
    const secondInput = parseFloat(this.state.factor);
    const savedInput = this.state.savedInput;

    let result;
    switch (this.state.operation) {
      case '/':
        result = firstInput / (secondInput || savedInput);
        this.setState({
          input: result,
          factor: '',
          savedInput: secondInput || savedInput
        });
        break;
      case '*':
        result = firstInput * (secondInput || savedInput);
        this.setState({
          input: result,
          factor: '',
          savedInput: secondInput || savedInput
        });
        break;
      case '-':
        result = firstInput - (secondInput || savedInput);
        this.setState({
          input: result,
          factor: '',
          savedInput: secondInput || savedInput
        });
        break;
      case '+':
        result = firstInput + (secondInput || savedInput);
        console.log(result);
        this.setState({
          input: result,
          factor: '',
          savedInput: secondInput || savedInput
        });
        break;
      default:
        console.log('default');
    }
  }
  componentDidMount() {
    this.handleKeyDown();

    this.setOperation();
  }
  render() {
    return (
      <Wrapper>
        <Input
          handleKeyDown={this.handleKeyDown}
          input={this.state.factor ? this.state.factor : this.state.input}
        />
        <Keypad
          setOperation={this.setOperation}
          handleKeyDown={this.handleKeyDown}
          clear={this.clear}
          plusOrMinus={this.plusOrMinus}
          percent={this.percent}
          clickNumber={this.clickNumber}
          calculate={this.calculate}
          operation={this.state.operation}
        />
      </Wrapper>
    );
  }
}

export default App;
