import React, {Component} from 'react';
import $ from 'jquery';
require('./Blip.scss');

export default class Blip extends Component {
  constructor() {
    super();
    this.state = {listView: false};
    this.showListview = this.showListview.bind(this);
    this.playAudio = this.playAudio.bind(this);
  }

  componentWillMount() {
    if(!this.state.listView) {
      this.setState({data: this.props.data});
    }

  }

  showListview() {
    this.setState({listView: true})
  }

  playAudio() {
    this.props.play({
      filename: this.props.data.filename,
      duration: this.props.data.duration
    });
  }
  render() {
    let blipView = null;
      if(!this.state.listView) {
        blipView = (
          <div>
            <div className="div__blip__header">
              <span>
                {this.state.data.createdtime}
              </span>
            </div>
            <div className="div__blip__body">
              <span>
                {this.state.data.transcription}
              </span>
            </div>
            <div className="div__blip__ctrlbar">
              <span className="span-text-item link" onClick={this.showListview}>
                Back
              </span>
              <span className="span-text-item link" onClick={this.playAudio}>
                Play
              </span>
              <span className="span-text-item link" onClick={this.showListview}>
                Next
              </span>
            </div>
          </div>
        );
      }
      else {
        blipView = (
          <div>
            ddd
          </div>
        );
      }


    return (
      <div className="div__blip">
        {blipView}
      </div>
    );
  }
}
