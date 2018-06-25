import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 15px 15px;
  margin: 10px auto;
  align-items: center;
  width: 95%;
`;

const Circle = styled.button`
  touch-action: manipulation;
  align-items: center;
  grid-column: span 1;
  grid-row: span 1;
  position: relative;
  width: 100%;
  height: 0;
  padding: 50% 0;
  line-height: 0;
  border: none;
  border-radius: 50%;
  background: #a1a1a1;
  background: ${props =>
    (props.orange && '#FE9400') ||
    (props.darkGrey && '#333333') ||
    (props.selected && '#ffffff')}
  color: white;
  font-size: 2.5em;
  outline: none;

  &:active {
    filter: grayscale(70%) brightness(130%);
  }

  &.selected {
    background: white;
    color: #FE9400;
  }


`;

const LongCircle = Circle.extend`
  background: #333333;
  grid-column-start: 1;
  grid-column-end: 3;
  border-radius: 90px;
  height: 100%;
  padding: 0 0;
  color: white;
`;

class Keypad extends Component {
  render() {
    const orange = 'orange';
    return (
      <Wrapper ontouchstart="">
        <Circle onClick={this.props.clear}>AC</Circle>
        <Circle onClick={this.props.plusOrMinus}>+/-</Circle>
        <Circle onClick={this.props.percent}>%</Circle>
        <Circle
          onClick={() => this.props.setOperation('/')}
          orange
          className={this.props.operation === '/' ? 'selected' : ''}
        >
          ÷
        </Circle>
        <Circle onClick={() => this.props.clickNumber(7)} darkGrey>
          7
        </Circle>
        <Circle onClick={() => this.props.clickNumber(8)} darkGrey>
          8
        </Circle>
        <Circle onClick={() => this.props.clickNumber(9)} darkGrey>
          9
        </Circle>
        <Circle
          onClick={() => this.props.setOperation('*')}
          orange
          className={this.props.operation === '*' ? 'selected' : ''}
        >
          X
        </Circle>
        <Circle onClick={() => this.props.clickNumber(4)} darkGrey>
          4
        </Circle>
        <Circle onClick={() => this.props.clickNumber(5)} darkGrey>
          5
        </Circle>
        <Circle onClick={() => this.props.clickNumber(6)} darkGrey>
          6
        </Circle>
        <Circle
          onClick={() => this.props.setOperation('-')}
          orange
          className={this.props.operation === '-' ? 'selected' : ''}
        >
          -
        </Circle>
        <Circle onClick={() => this.props.clickNumber(1)} darkGrey>
          1
        </Circle>
        <Circle onClick={() => this.props.clickNumber(2)} darkGrey>
          2
        </Circle>
        <Circle onClick={() => this.props.clickNumber(3)} darkGrey>
          3
        </Circle>
        <Circle
          onClick={() => this.props.setOperation('+')}
          orange
          className={this.props.operation === '+' ? 'selected' : ''}
        >
          +
        </Circle>
        <LongCircle onClick={() => this.props.clickNumber(0)}>0</LongCircle>
        <Circle onClick={() => this.props.clickNumber('.')} darkGrey>
          .
        </Circle>
        <Circle onClick={this.props.calculate}>=</Circle>
      </Wrapper>
    );
  }
}

export default Keypad;
