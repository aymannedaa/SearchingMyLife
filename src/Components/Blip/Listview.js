import React, {Component} from 'react';
import $ from 'jquery';
import moment from 'moment';
require('./Listview.scss');

export default class Listview extends Component {
  constructor() {
    super();
    this.playAudio = this.playAudio.bind(this);
  }

  playAudio(filename, duration) {
    this.props.play({
      filename: filename,
      duration: duration
    });
  }

  render() {
    return (
      <div className="div__listview">
        <div className="div__listitem__header">
          <span className="span__direction">
            {this.props.direction === 'back' ? 'Before' : 'After'}
          </span>
          <span>
            {moment(this.props.timestamp).format('YYYY')}
          </span>
          <span>
            {moment(this.props.timestamp).format('ddd, MMM Do') + ' '}
          </span>
          <span>
            {moment(this.props.timestamp).format('h:mm a') + ' '}
          </span>
          <img className="img__close" onClick={this.props.close} src="images/close.svg"></img>
        </div>
        <div className="div__listitem">
          <ul>
            {this.props.list.map((item, index) => {
              return <li key={index}>
                <span className="link" onClick={() => {this.playAudio(item.filename, item.duration)}}>{item.transcription}</span>
              </li>
            })}
          </ul>
        </div>
      </div>
    );
  }
}
