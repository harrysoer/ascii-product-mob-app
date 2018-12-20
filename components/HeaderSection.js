/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Picker } from "native-base";
import styled from "styled-components/native";
import { white } from "ansi-colors";

const Header = styled.View`
  align-items: center;
  background: #41d46a;
  height: 250px;
`;

const Title = styled.Text`
  margin-top: 20px;
  color: #ffff;
  font-size: 40px;
`;

const Description = styled.Text`
  color: #ffff;
  font-size: 18px;
  margin: 10px 20px;
  text-align: center;
`;

const PickerStyling = {
  borderWidth: 2,
  borderColor: "#ffff",
  marginTop: 4,
  width: 250
};

const PickerSelectStyle = { color: "#ffff", fontSize: 18 };

type Props = {
  selectedSort: string,
  onSort: any,
};

export default class HeaderSection extends Component<Props> {
  render() {
    const { selectedSort, onSort } = this.props;
    return (
      <Header>
        <Title>Products Grid</Title>
        <Description>
          Here you're sure to find a bargain on some of the finest ascii
          available to purchase. Be sure to peruse our selection of ascii faces
          in an exciting range of sizes and prices.
        </Description>
        <Picker
          placeholder={"Sort By..."}
          selectedValue={selectedSort}
          style={PickerStyling}
          textStyle={PickerSelectStyle}
          onValueChange={onSort}
        >
          <Picker.Item label="Price" value="price" />
          <Picker.Item label="Size" value="size" />
          <Picker.Item label="ID" value="id" />
        </Picker>
      </Header>
    );
  }
}
