'use strict';

import React, {Component} from 'react';
import $ from 'jquery';
require('./Player.scss');

export default class Player extends Component {
  constructor() {
    super();
    this.audioContext = null;
    this.audioSource = null;
    this.audioTimer = 0;
    this.playbackTimerId = null;
    this.playbackId = null;
    this.sliderMoveBy = 0;
    this.sliderCurrPos = 0;
    this.getAudio = this.getAudio.bind(this);
    this.resetPlayback = this.resetPlayback.bind(this);
    this.resetAudioTimer = this.resetAudioTimer.bind(this);
    this.playback = this.playback.bind(this);
    this.showPlaybackTime = this.showPlaybackTime.bind(this);
  }

  resetPlayback() {
    let currPos = $(this.refs.slider).css('left').replace('px', '');
    $(this.refs.slider).css({left: (currPos - this.sliderCurrPos) + 'px'});
    this.sliderCurrPos = 0;
  }

  playback() {
    let left = parseFloat($(this.refs.slider).css('left').replace('px', '')) + this.sliderMoveBy;
    $(this.refs.slider).css({left: left + 'px'});
    this.sliderCurrPos += this.sliderMoveBy;
  }

  resetAudioTimer() {
    this.audioTimer = 0;
    $(this.refs.timer).text(0);
  }

  showPlaybackTime() {
    this.audioTimer += 0.01;
    $(this.refs.timer).text(Math.round(this.audioTimer * 100)/100);
    //console.log('Playback time ' + this.audioTimer);
  }

  getAudio() {
    if(this.props.nowPlaying) {
      let url = `/streamaudio/${this.props.nowPlaying.filename}`;
      let request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType = 'arraybuffer';
      request.onload = () => {
        this.audioContext.decodeAudioData(request.response, (buffer) => {
          this.audioSource = this.audioContext.createBufferSource();
          this.audioSource.buffer = buffer;
          this.audioSource.connect(this.audioContext.destination);

          this.audioSource.onended = () => {
            if(this.playbackId) {
              clearInterval(this.playbackId);
              this.resetPlayback();
            }
            if(this.playbackTimerId) {
              clearInterval(this.playbackTimerId);
              this.resetAudioTimer();
            }
          }
          this.playbackTimerId = setInterval(this.showPlaybackTime, 10);
          this.playbackId = setInterval(this.playback, 10);
          this.audioSource.start(0);
        });
      }
      request.send();
    }
  }

  componentWillMount() {
    let Context = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new Context();
  }

  componentDidMount() {
    const sliderWidth = $(this.refs.progress_bar).width();
    //console.log(sliderWidth);
    this.sliderMoveBy = parseFloat(sliderWidth) / 1239;
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.audioSource) {
      this.audioSource.stop();
    }
    this.getAudio();
  }

  render() {
    return (
      <div className="div__player">
        <div ref="progress_bar" className="div__player__progressbar">
          <div ref="slider" className="div__player__slider"></div>
          <div ref="timer"className="div__progress__timer">{this.audioTimer}</div>
        </div>
      </div>
    );
  }
}
