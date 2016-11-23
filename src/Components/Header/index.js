import React, {Component} from 'react';
import $ from 'jquery';
require('./Header.scss');

export default class Header extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="div__header__container">
        <div className="div__header__brand">
          <span className="span-text-item">Searching My Life</span>
        </div>
        <div className="div__header__items">
          {this.props.username} <span className="span-text-item link"><a href="/logout">Logout</a></span>
        </div>
      </div>
    );
  }
}
