import React, {Component} from 'react';
import $ from 'jquery';
import 'whatwg-fetch';
import Header from '../Components/Header';
import SearchBox from '../Components/SearchBox';
import Footer from '../Components/Footer';
import View from '../Components/View';
import store from '../store';
require('./Page.scss');

export default class Page extends Component {
  constructor() {
    super();
    this.state = {data: null};
    this.displaySearchResults = this.displaySearchResults.bind(this);
    this.playSelectedAudio = this.playSelectedAudio.bind(this);
  }
  /*
  getAudio(context) {
    let Context = window.AudioContext || window.webkitAudioContext;
    console.log(Context)
    const context = new Context();
    this.getAudio(context);


    let url = `/streamaudio/${this.props.filename}`;
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
  */
  displaySearchResults() {
    this.setState({data: store.getData()});
  }

  playSelectedAudio(audioMetaData) {

    this.setState({nowPlaying: audioMetaData.filename});
  }

  render() {
    return (
      <div className="div__page">
        <Header username="Sayantan"></Header>
        <SearchBox update={this.displaySearchResults}></SearchBox>
        <View data={this.state.data} play={this.playSelectedAudio}/>
        <Footer></Footer>
      </div>
    );
  }
}
