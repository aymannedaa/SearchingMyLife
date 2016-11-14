import React, {Component} from 'react';
import $ from 'jquery';
require('./Player.scss');

export default class Player extends Component {
  constructor() {
    super();
    this.getAudio = this.getAudio.bind(this);
  }

  getAudio(context) {
    if(this.props.nowPlaying) {
      let url = `/streamaudio/${this.props.nowPlaying.filename}`;
      let request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType = 'arraybuffer';
      request.onload = () => {
        context.decodeAudioData(request.response, (buffer) => {
          let source = context.createBufferSource();
          source.buffer = buffer;
          source.connect(context.destination);
          source.start(0);
        });
      }
      request.send();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let Context = window.AudioContext || window.webkitAudioContext;
    const context = new Context();
    this.getAudio(context);
  }

  componentDidMounts() {
    const width = $(this.refs.player).width();
    const height = $(this.refs.player).height();
    const mid = parseFloat(height) / 2;
    console.log(width, height);
    let svgContainer = d3.select('.div__player').append('svg')
      .attrs({
        'width': width,
        'height': height
      });
    svgContainer.append('path').attrs({
      d: `M5,${height}L191,${height}`,
      'stroke': 'red',
      'stroke-width': '2'
    });
  }

  render() {
    return (
      <div className="div__player">
        <div className="div__player__progressbar">
          <div className="div__player__slider"></div>
        </div>

      </div>
    );
  }
}
