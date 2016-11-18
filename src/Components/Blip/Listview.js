import React, {Component} from 'react';
import $ from 'jquery';
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
        <div className="div__listitem__close">
          <span className="link" onClick={this.props.close}>x</span>
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
