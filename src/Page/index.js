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

  displaySearchResults() {
    this.setState({searchingFor: store.getSearchingFor(), data: store.getData()});
  }

  playSelectedAudio(audioMetaData) {
    this.setState({nowPlaying: audioMetaData});
  }

  componentWillMount() {
    $.ajax({
      url: '/username',
      type: 'GET',
    }).done((data) => {
      this.setState({username: data.username});
    }).fail((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="div__page">
        <Header username={this.state.username}></Header>
        <SearchBox update={this.displaySearchResults}></SearchBox>
        <View data={this.state.data} searchingFor={this.state.searchingFor} play={this.playSelectedAudio}/>
        <Footer nowPlaying={this.state.nowPlaying}></Footer>
      </div>
    );
  }
}
