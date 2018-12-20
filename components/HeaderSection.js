/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform } from "react-native";
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

//added color styling for android dependency
const PickerCustom = styled(Picker)`
  ${Platform.OS === "android" ? "color: #ffff;" : ""}
  border-width: 2;
  border-color: #ffff;
  width: 250px;
`;

const PickerSelectStyle = {
  color: "#ffff",
  fontSize: 20
};

type Props = {
  selectedSort: string,
  onSort: any
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
        <PickerCustom
          placeholder={"Sort By..."}
          selectedValue={selectedSort}
          textStyle={PickerSelectStyle}
          onValueChange={onSort}
        >
          <PickerCustom.Item label="Price" value="price" />
          <PickerCustom.Item label="Size" value="size" />
          <PickerCustom.Item label="ID" value="id" />
        </PickerCustom>
      </Header>
    );
  }
}
