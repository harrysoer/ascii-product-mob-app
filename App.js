/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import styled from "styled-components/native";
import axios from "axios";

import Products from "./comonents/Products";

const CancelToken = axios.CancelToken;

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
`;

const Title = styled.Text`
  color: #ffff;
  font-size: 40px;
`;

const Description = styled.Text`
  color: #ffff;
  font-size: 18px;
  margin: 30px 20px;
  text-align: center;
`;

const ProductList = styled.ScrollView``;

const popTest = {
  products: [
    {
      id: "83901-vic49cw4v3i",
      size: 50,
      price: 24,
      face: "( .-. )",
      date: "Sun Dec 09 2018 08:21:08 GMT+0800 (Philippine Standard Time)"
    },
    {
      id: "63480-ulvtmb27q49",
      size: 27,
      price: 181,
      face: "( .o.)",
      date: "Tue Dec 04 2018 15:37:41 GMT+0800 (Philippine Standard Time)"
    },
    {
      id: "62730-svodx5knf6",
      size: 28,
      price: 629,
      face: "( `·´ )",
      date: "Wed Dec 12 2018 18:35:07 GMT+0800 (Philippine Standard Time)"
    },
    {
      id: "62730-svodx51nf6",
      size: 28,
      price: 629,
      face: "( `·´ )",
      date: "Wed Dec 12 2018 18:35:07 GMT+0800 (Philippine Standard Time)"
    }
  ]
};
// ======

type Props = {};
type State = {
  products: Array<any>,
  query: Object,
  queuedProducts: Array<any>,
  isLoading: boolean,
  isDoneFetching: boolean,
  cancelSource: any
};

export default class App extends Component<Props, State> {
  state = {
    products: [],
    queuedProducts: [],
    isEnd: false,
    isDoneFetching: false,
    isLoading: false,
    cancelSource: CancelToken.source(),
    willContinue: true,
    query: {
      _page: 1,
      _sort: "",
      _limit: 40
    }
  };
  componentDidMount() {
    this.fetch(true);
  }

  fetch = async (isInitialFetch: boolean = true) => {
    const { query } = this.state;
    const param = Object.keys(query)
      .map(key => `${key}=${query[key]}`)
      .join("&");
    let newQuery = { ...query };

    this.setState({ isLoading: true });

    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/products?${param}`,
        { cancelToken: this.state.cancelSource.token }
      );
      const { queuedProducts } = this.state;

      let newProducts = isInitialFetch ? data : [...queuedProducts, ...data];
      newQuery = { ...newQuery, _page: 1 + query["_page"] };
      console.log(newProducts);
      this.setState({
        [isInitialFetch ? "products" : "queuedProducts"]: newProducts,
        isLoading: false,
        isDoneFetching: data.length ? false : true,
        cancelSource: CancelToken.source(),
        query: newQuery
      });

      data.length && this.fetch(false);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("canceled");
      }
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { products } = this.state;

    return (
      <>
        <ProductList>
          <Header>
            <Title>Products Grid</Title>
            <Description>
              Here you're sure to find a bargain on some of the finest ascii
              available to purchase. Be sure to peruse our selection of ascii
              faces in an exciting range of sizes and prices.
            </Description>
          </Header>
          {popTest.products.map(product => (
            <Products key={product.id} product={product} />
          ))}
        </ProductList>
      </>
    );
  }
}
