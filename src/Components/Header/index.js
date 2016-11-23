import React, {Component} from 'react';
import $ from 'jquery';
require('./Header.scss');

export default class Header extends Component {
  constructor() {
    super();
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  logoutHandler() {
    $.ajax({
        url: '/logout',
        type: 'GET',
      }).done((data) => {

      }).fail((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="div__header__container">
        <div className="div__header__brand">
          <span className="span-text-item">Searching My Life</span>
        </div>
        <div className="div__header__items">
          {this.props.username} <span className="span-text-item link" onClick={this.logoutHandler}>Logout</span>
        </div>
      </div>
    );
  }
}
