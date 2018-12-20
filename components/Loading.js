import React, { Component } from "react";
import styled from "styled-components";

const LoadingContainer = styled.Text`
  width: 100%;
  text-align: center;
  flex: 1;
  font-size: 30px;
  margin: 10px 0;
`;

export default class LoadingIcon extends Component {
  intervalQueue = 0;
  timeoutQueue = 0;
  state = {
    loadingIcon: ""
  };

  componentDidMount() {
    clearInterval(this.intervalQueue);
    let index = 0;
    const frequency = 5;
    const ASCIIs = ["–", "/", "|", "\\\\"];
    this.intervalQueue = setInterval(() => {
      this.timeoutQueue = setTimeout(() => {
        this.setState({
          loadingIcon: ASCIIs[index]
        });
        index = index === 3 ? 0 : ++index;
      }, 1000 / frequency);
    }, 200);
  }

  render() {
    return (
      <LoadingContainer>{this.state.loadingIcon} Loading...</LoadingContainer>
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalQueue);
    clearTimeout(this.timeoutQueue);
  }
}
