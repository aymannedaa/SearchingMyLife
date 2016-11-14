import React, {Component} from 'react';
import Blip from '../Blip';
import store from '../../store';
require('./View.scss');

export default class View extends Component {
  constructor() {
    super();
  }

  render () {
    let blips = null;
    if(this.props.data) {
      blips = this.props.data.map((item, index) => {
        return (
          <Blip key={index} data={item}></Blip>
        );
      });
    }
    return (
      <div className={blips ? "div__content filled" : "div__content empty"}>
        {blips ? blips : (
          <span className="span__empty-text">
            You haven't got anything there
          </span>
        )}
      </div>
    );
  }
}
