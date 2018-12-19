/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import styled from "styled-components/native";
// const instructions = Platform.select({
//   ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
//   android:
//     "Double tap R on your keyboard to reload,\n" +
//     "Shake or press menu button for dev menu"
// });

const Header = styled.View`
    align-items: center;
    background: #41d46a;
    height: 300px;
    justify-content: center;
    margin-bottom: 30px;
`

const Title = styled.Text`
    color: #ffff;
    font-size: 40px;
`;

const Description = styled.Text`
    color: #ffff;
    font-size: 18px;
    margin: 30px 20px;
    text-align: center;
`

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Header >
        <Title>Products Grid</Title>
        <Description>
          Here you're sure to find a bargain on some of the finest
          ascii available to purchase. Be sure to peruse our selection of ascii
          faces in an exciting range of sizes and prices.
        </Description>
      </Header>
    );
  }
}