import React, { Component } from 'react';
import styled from 'styled-components';
import '../App.css';

import Input from './Input';
import Keypad from './Keypad';

const Wrapper = styled.div`
  width: 400px;
  height: 600px;
  margin: auto;
  background: black;
  padding: 10px;
`;
class App extends Component {
  constructor() {
    super();

    this.state = {
      input: 0,
      factor: '',
      function: '',
      result: ''
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.calculate = this.calculate.bind(this);
    this.buttonPush = this.buttonPush.bind(this);
    this.clear = this.clear.bind(this);
    this.plusOrMinus = this.plusOrMinus.bind(this);
    this.percent = this.percent.bind(this);
    this.clickNumber = this.clickNumber.bind(this);
  }

  handleKeyDown(operator) {
    document.body.addEventListener('keydown', e => {
      console.log(e.key);
      e.preventDefault();

      if (e.key.match(/[0-9]|\.|Backspace/) && !this.state.function) {
        let input = this.state.input.toString();

        if (e.key.match('Backspace')) {
          input = input.toString().slice(0, -1);
          this.setState({ input });
        }

        if (e.key.match(/\./)) {
          //let input = this.state.input;
          input = input.toString() + e.key;
          console.log(input + e.key);
          this.setState({ input });
          return;
        }
        input = input + e.key;
        this.setState({ input: parseFloat(input, 10) || 0 });
      }

      if (e.key.match('Escape')) {
        this.clear();
      }
      if (e.key.match(/\//)) {
        this.setState({ function: '/' });
      }
      if (e.key.match(/\*|x|X/)) {
        this.setState({ function: '*' });
      }
      if (e.key.match('-')) {
        this.setState({ function: '-' });
      }
      if (e.key.match(/\+/)) {
        this.setState({ function: '+' });
      }

      if (e.key.match(/[0-9]|\.|Backspace/) && this.state.function) {
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

      console.log('keypush');
    });
    document.body.addEventListener('keydown', e => {
      if (e.key.match(/=|Enter/)) {
        this.calculate();
      }
    });
  }

  buttonPush(button) {
    if (button === '/') {
      this.setState({ function: '/' });
    }
    if (button === '*') {
      this.setState({ function: '*' });
    }
    if (button === '-') {
      this.setState({ function: '-' });
    }
    if (button === '+') {
      this.setState({ function: '+' });
    }
  }

  clear() {
    this.setState({ input: 0, factor: '', function: '' });
  }

  plusOrMinus() {
    const input = this.state.input;
    const factor = this.state.factor;
    if (!factor) {
      if (input === 0) {
        this.setState({ input: '-' + input });
      } else {
        this.setState({ input: input * -1 });
      }
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
    this.setState({ input: input * 0.01 });
  }

  clickNumber(number) {
    let input = this.state.input;
    let factor = this.state.factor;

    number = number.toString();
    if (!this.state.function) {
      if (number === '.') {
        let input = this.state.input;
        input = input.toString() + number;
        console.log(input + number);
        this.setState({ input });
        return;
      }
      input = input + number;
      this.setState({ input: parseFloat(input, 10) || 0 });
    }

    if (this.state.function) {
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
    console.log('thinking');
    const firstInput = this.state.input;
    const secondInput = parseFloat(this.state.factor);
    console.log(firstInput);
    console.log(secondInput);
    console.log(firstInput * secondInput);
    let result;
    switch (this.state.function) {
      case '/':
        result = firstInput / secondInput;
        this.setState({ input: result, factor: 0 });
        break;
      case '*':
        result = firstInput * secondInput;
        this.setState({ input: result, factor: 0 });
        break;
      case '-':
        this.setState({ input: firstInput - secondInput, factor: 0 });
        break;
      case '+':
        result = firstInput + secondInput;
        console.log(result);
        this.setState({ input: result, factor: 0 });
        break;
      default:
        console.log('default');
    }
  }
  componentDidMount() {
    this.handleKeyDown();

    this.buttonPush();
  }
  render() {
    return (
      <Wrapper>
        <Input
          handleKeyDown={this.handleKeyDown}
          input={this.state.factor ? this.state.factor : this.state.input}
        />
        <Keypad
          buttonPush={this.buttonPush}
          handleKeyDown={this.handleKeyDown}
          clear={this.clear}
          plusOrMinus={this.plusOrMinus}
          percent={this.percent}
          clickNumber={this.clickNumber}
          calculate={this.calculate}
        />
      </Wrapper>
    );
  }
}

export default App;
