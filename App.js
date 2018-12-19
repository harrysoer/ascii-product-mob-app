/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import styled from "styled-components/native";
import axios from "axios";
import { unionBy } from "lodash";

import Products from "./components/Products";

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

const Advertisement = styled.Text`
  color: #123456;
  font-size: 30px;
`;

const ProductList = styled.FlatList``;

const End = styled.Text`
  width: 100%;
  text-align: center;
  font-size: 30px;
  margin: 20px 0;
`;
// ======

type Props = {};
type State = {
  products: Array<any>,
  query: Object,
  queuedProducts: Array<any>,
  isLoading: boolean,
  isEnd: boolean,
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
      newProducts = data.length
        ? newProducts
        : [...newProducts, "~ end of catalogue ~"];

      newQuery = { ...newQuery, _page: 1 + query["_page"] };
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

  fetchQueuedList = () => {
    const { isEnd, queuedProducts } = this.state;

    if (!isEnd && queuedProducts.length) {
      const { isDoneFetching, products } = this.state;
      let newQueuedProducts = [...queuedProducts];
      let newProducts = newQueuedProducts.slice(0, 40);
      newQueuedProducts.splice(0, 40);

      let isEnd = isDoneFetching && !newQueuedProducts.length ? true : false;
      let prodlist = unionBy(products, newProducts, "id");

      this.setState(
        {
          products: prodlist,
          queuedProducts: newQueuedProducts,
          isEnd
        });
    } else {
      const { isDoneFetching, queuedProducts } = this.state;

      let isEnd = isDoneFetching && queuedProducts ? true : false;
      this.setState({ isEnd });
    }
  };

  renderList = (param: Object) => {
    const { item, index } = param;
    const isLast = typeof item === "string";
    if (!isLast) {
      return (
        <>
          <Products product={item} />
          {(index + 1) % 20 === 0 && (
            <Advertisement>ADVERTISEMENT CONTAINER</Advertisement>
          )}
        </>
      );
    } else {
      const { isEnd, isDoneFetching, queuedProducts } = this.state;
      return (
        <>
          {isEnd && isDoneFetching && !queuedProducts.length && (
            <End>~ end of catalogue ~</End>
          )}
        </>
      );
    }
  };

  render() {
    const { products } = this.state;

    return (
      <>
        <Header>
          <Title>Products Grid</Title>
          <Description>
            Here you're sure to find a bargain on some of the finest ascii
            available to purchase. Be sure to peruse our selection of ascii
            faces in an exciting range of sizes and prices.
          </Description>
        </Header>
        <ProductList
          data={products}
          onEndReached={this.fetchQueuedList}
          keyExtractor={item => (typeof item === "string" ? item : item.id)}
          renderItem={this.renderList}
        />
      </>
    );
  }
}
