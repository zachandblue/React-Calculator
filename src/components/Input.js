import React, { Component } from 'react';
import styled from 'styled-components';

const StyledInput = styled.div`
  width: 100%;
  height: 16vh;

  border: none;
  width: 95%;
  margin: 0 auto;
  outline: none;
`;

const InputH1 = styled.h1`
  font-size: 13vh;
  color: white;
  text-align: right;
  margin: 0;
  font-weight: lighter;
`;

class Input extends Component {
  render() {
    return (
      <div>
        <StyledInput onKeyPress={this.props.handleKeyDown}>
          <InputH1>{this.props.input}</InputH1>
        </StyledInput>
      </div>
    );
  }
}

export default Input;
