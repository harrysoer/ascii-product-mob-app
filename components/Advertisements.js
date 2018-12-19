/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import styled from "styled-components/native";

const AdsContainer = styled.View`
  width: 100%;
`;

const Message = styled.Text`
  text-align: center;
`;

const Image = styled.Image`
  margin: auto;
  height: 300px;
  width: 90%;
`;

type Props = { Id: number };

const Advertisement = (props: Props) => {
  const source = `http://localhost:3000/ads/?r=${props.Id}`;

  return (
    <AdsContainer>
      <Message>But first, a word from our sponsors:</Message>
      <Image source={{ uri: source }} />
    </AdsContainer>
  );
};

export default Advertisement;
