/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import styled from "styled-components/native";
import axios from "axios";
import { unionBy } from "lodash";

import Products from "./components/Products";
import Advertisement from "./components/Advertisements";
import HeaderSection from "./components/HeaderSection";
import LoadingIcon from "./components/Loading";

const CancelToken = axios.CancelToken;

const ProductList = styled.FlatList``;

const End = styled.Text`
  width: 100%;
  text-align: center;
  font-size: 30px;
  margin: 20px 0;
`;

type Props = {};
type State = {
  products: Array<any>,
  query: Object,
  queuedProducts: Array<any>,
  hasReachedEnd: boolean,
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
    hasReachedEnd: true,
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
    console.log("fetching");
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/products?${param}`,
        { cancelToken: this.state.cancelSource.token }
      );
      const { queuedProducts } = this.state;
      let newProducts = isInitialFetch ? data : [...queuedProducts, ...data];

      newQuery = { ...newQuery, _page: 1 + query["_page"] };
      this.setState({
        [isInitialFetch ? "products" : "queuedProducts"]: newProducts,
        isLoading: false,
        hasReachedEnd: false,
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

    this.setState({ hasReachedEnd: true });

    if (!isEnd && queuedProducts.length) {
      const { isDoneFetching, products } = this.state;
      let newQueuedProducts = [...queuedProducts];
      let newProducts = newQueuedProducts.slice(0, 40);
      newQueuedProducts.splice(0, 40);

      let isEnd = isDoneFetching && !newQueuedProducts.length ? true : false;
      let prodlist = unionBy(products, newProducts, "id");

      this.setState({
        products: prodlist,
        queuedProducts: newQueuedProducts,
        hasReachedEnd: isEnd,
        isEnd
      });
    } else {
      const { isDoneFetching, queuedProducts } = this.state;

      let isEnd = isDoneFetching && queuedProducts ? true : false;
      this.setState({ isEnd });
    }
  };

  onSort = (option: Object) => {
    const { query, cancelSource } = this.state;
    cancelSource.cancel();

    this.setState(
      {
        query: { ...query, _page: 1, _sort: option },
        isDoneFetching: false,
        isEnd: false,
        isLoading: true,
        hasReachedEnd: true,
        products: [],
        cancelSource: CancelToken.source(),
        queuedProducts: []
      },
      _ => setTimeout(this.fetch, 1000)
    );
  };

  renderList = (param: Object) => {
    const { item, index } = param;
    return (
      <>
        <Products product={item} />
        {(index + 1) % 20 === 0 && (
          <Advertisement Id={Math.floor(Math.random() * 20)} />
        )}
      </>
    );
  };

  render() {
    const {
      products,
      query,
      hasReachedEnd,
      isEnd,
      isLoading,
      isDoneFetching,
      queuedProducts
    } = this.state;

    return (
      <>
        <HeaderSection selectedSort={query["_sort"]} onSort={this.onSort} />
        <ProductList
          data={products}
          onEndReached={this.fetchQueuedList} //I used this built-in function of React-Native's flatList component due to the limits of measuring the device's screen size
          keyExtractor={item => (typeof item === "string" ? item : item.id)}
          renderItem={this.renderList}
        />

        {hasReachedEnd && isLoading && <LoadingIcon />}
        {isEnd && isDoneFetching && !queuedProducts.length && (
          <End>"~ end of catalogue ~"</End>
        )}
      </>
    );
  }
}
