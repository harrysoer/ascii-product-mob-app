/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import styled from "styled-components/native";

//   box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);

const ProductCard = styled.View`
  background: #ffff;
  border-radius: 10px;
  margin: 10px;
  min-width: 100px;
  margin: 30px 20px;
  shadow-color: #000000;
  shadow-opacity: 0.1;
  shadow-radius: 5;
`;

const FaceContainer = styled.View`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: #e8e8e8;
`;

const ProductFace = styled.Text`
align-items: center;
  color: #3c3b3b;
  min-height: 100px;
  text-align: center;
  justify-content: center;
  padding: 30px;
  font-size: ${props => props.size + "px" || "18px"};
`;

const ProductPrice = styled.Text`
  font-weight: 700;
  font-size: 18px;
  padding: 10px 10px 5px 10px;
  color: #41d46a;
`;

const ProductSize = styled.Text`
  font-size: 15.5px;
  padding: 0 10px 10px 10px;
`;
const ProductDateAdded = styled.Text`
  font-size: 14px;
  text-align: right;
  color: #484848;
  padding: 2px 5px;
`;

type Props = { product: Object };

export default class Products extends Component<Props> {
  formatDate = (dateAdded: string) => {
    let newDateAddedMs = new Date(dateAdded).getTime(),
      dateTodayMs = new Date().getTime(),
      dayDifference = 0;
    const dayMs = 1000 * 60 * 60 * 24,
      timeDifference = Math.abs(dateTodayMs - newDateAddedMs);

    dayDifference = Math.ceil(timeDifference / dayMs);

    if (dayDifference > 7) {
      return new Date(dateAdded).toDateString().slice(4);
    } else {
      let dayText = "";

      if (dayDifference === 7) {
        dayText = "A week ago";
      } else if (dayDifference === 1) {
        dayText = "Today";
      } else {
        dayDifference = dayDifference - 1; //Corrects the format
        dayText = `${dayDifference} day${dayDifference > 1 ? "s" : ""} ago`;
      }

      return dayText;
    }
  };

  render() {
    const { product } = this.props;
    return (
      <>
        <ProductCard>
          <FaceContainer>
            <ProductFace size={product.size}>{product.face}</ProductFace>
          </FaceContainer>
          <ProductPrice>${Number(product.price).toFixed(2)}</ProductPrice>
          <ProductSize>{product.size}px</ProductSize>
          <ProductDateAdded>{this.formatDate(product.date)}</ProductDateAdded>
        </ProductCard>
      </>
    );
  }
}
