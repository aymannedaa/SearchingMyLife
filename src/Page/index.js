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
    this.state = {data: null};
    this.updateComponent = this.updateComponent.bind(this);
  }

  updateComponent() {
    this.setState({data: store.getData()});
  }

  render() {
    return (
      <div className="div__page">
        <Header username="Sayantan"></Header>
        <SearchBox update={this.updateComponent}></SearchBox>
        <View data={this.state.data}/>
        <Footer></Footer>
      </div>
    );
  }
}
