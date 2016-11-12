import React, {Component} from 'react';
import store from '../../store';
require('./View.scss');

export default class View extends Component {
  constructor() {
    super();
  }

  render () {
    return (
      <div className="div__content">
        <span className="span__empty-text">
          You haven't got anything there
        </span>
      </div>
    );
  }
}
