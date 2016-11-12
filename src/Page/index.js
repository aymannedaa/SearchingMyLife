import React, {Component} from 'react';
import $ from 'jquery';
import 'whatwg-fetch';
import Header from '../Components/Header';
import SearchBox from '../Components/SearchBox';
import Footer from '../Components/Footer';
require('./Page.scss');

export default class Page extends Component {
  constructor() {
    super();
  }
  componentWillMount() {
    /*
    fetch('http://35.162.240.178:8080/search/words/look', {
      method: 'get',
      mode: 'no-cors',
      headers: {

      }
    })
    .then((response) => {
      console.log(response)
      return response.json();
    })
    .then((data) => {
      console.log(222);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
    */
    //$.getJSON('http://35.162.240.178:8080/search/words/look').done(function(data) {console.log(data)});
    $.ajax({
      url: 'http://35.162.240.178:8080/search/words/look',
      type: 'GET',
      crossDomain: true,
      success: function(res) {console.log(res)}
    });
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
