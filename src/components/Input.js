import React, { Component } from 'react';
import styled from 'styled-components';

const StyledInput = styled.div`
  width: 100%;
  height: 16vh;
  border: none;
  width: 95%;
  margin: 0 auto;
  outline: none;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
`;

const InputH1 = styled.h1`
  font-size: 13vh;
  overflow: hidden;
  color: white;
  ${'' /* text-align: right; */} margin: 0;
  font-weight: lighter;

  &.small {
    font-size: 11vh;
  }
  &.smaller {
    font-size: 9vh;

    margin: 0 auto;
  }
  &.smallest {
    font-size: 8vh;

    margin: 0 auto;
  }
`;

class Input extends Component {
  render() {
    const fontSize = () => {
      if (!this.props.input) return;
      const length = this.props.input.toString().length;
      if (length === 7) return 'small';
      if (length === 8) return 'smaller';
      if (length >= 9) return 'smallest';
    };

    return (
      <div>
        <StyledInput onKeyPress={this.props.handleKeyDown}>
          <InputH1 className={fontSize()}>
            {this.props.input > 999999999
              ? this.props.input.toExponential()
              : this.props.input.toLocaleString('en')}
          </InputH1>
        </StyledInput>
      </div>
    );
  }
}

export default Input;
