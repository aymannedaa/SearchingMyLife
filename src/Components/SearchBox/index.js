import React, {Component} from 'react';
import $ from 'jquery';
require('./SearchBox.scss');

export default class SearchBox extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="div__searchbox">
        <input className="input-text__search" type="text" placeholder="Enter your query ..."/>
      </div>
    );
  }
}
