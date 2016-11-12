import React, {Component} from 'react';
import $ from 'jquery';
import 'whatwg-fetch';
import Header from '../Components/Header';
import SearchBox from '../Components/SearchBox';
import Footer from '../Components/Footer';
import View from '../Components/View';
import store from '../store';
require('./Page.scss');

export default class Page extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="div__page">
        <Header username="Sayantan"></Header>
        <SearchBox></SearchBox>
        <View />
        <Footer></Footer>
      </div>
    );
  }
}
