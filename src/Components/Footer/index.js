import React, {Component} from 'react';
import Player from '../Player';
import $ from 'jquery';
require('./Footer.scss');

export default class Footer extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="div__footer__container">
        <div className="div__footer__searchbox">
          <input type="text" placeholder="Filter results"/>
        </div>
        <div className="div__footer__player">
          <Player nowPlaying={this.props.nowPlaying}></Player>
        </div>
      </div>
    );
  }
}
