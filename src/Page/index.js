import React, {Component} from 'react';
import $ from 'jquery';
import 'whatwg-fetch';
import Header from '../Components/Header';
import SearchBox from '../Components/SearchBox';
import Footer from '../Components/Footer';
import {store} from '../store';
require('./Page.scss');

export default class Page extends Component {
  constructor() {
    super();
  }
  componentWillMount() {

  }
  render() {
    return (
      <div className="div__page">
        <Header username="Sayantan"></Header>
        <SearchBox></SearchBox>
        <div className="div__content">
          <span className="span__empty-text">
            You haven't got anything there
          </span>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}
