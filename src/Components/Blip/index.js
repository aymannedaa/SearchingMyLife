import React, {Component} from 'react';
import $ from 'jquery';
require('./Blip.scss');

export default class Blip extends Component {
  constructor() {
    super();
    this.playAudio = this.playAudio.bind(this);
  }

  playAudio() {
    this.props.play({
      filename: this.props.data.filename,
      duration: this.props.data.duration
    });
  }
  render() {
    return (
      <div className="div__blip">
        <div className="div__blip__header">
          <span>
            {this.props.data.createdtime}
          </span>
        </div>
        <div className="div__blip__body">
          <span>
            {this.props.data.transcription}
          </span>
        </div>
        <div className="div__blip__ctrlbar">
          <span className="span-text-item link">
            Back
          </span>
          <span className="span-text-item link" onClick={this.playAudio}>
            Play
          </span>
          <span className="span-text-item link">
            Next
          </span>
        </div>
      </div>
    );
  }
}
