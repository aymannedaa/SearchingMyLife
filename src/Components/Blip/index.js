import React, {Component} from 'react';
import Listview from './Listview';
import $ from 'jquery';
require('./Blip.scss');

export default class Blip extends Component {
  constructor() {
    super();
    this.state = {listView: false};
    this.showListview = this.showListview.bind(this);
    this.closeListview = this.closeListview.bind(this);
    this.playAudio = this.playAudio.bind(this);
  }

  showListview(direction) {
    const word = this.props.searchingFor;
    let url = '';
    if(direction === 'back') {
      const timestamp = this.props.data.createdtime;
      url = '/search/wordsbefore/' + word + '/' + timestamp;
    }
    else if(direction === 'next') {
      const timestamp = this.props.data.endtime;
      url = '/search/wordsafter/' + word + '/' + timestamp;
    }
    $.ajax({
      url: url,
      type: 'GET',
    }).done((data) => {
      //store.setData(data);
      //that.props.update();
      this.setState({listView: true, listData: data});
    }).fail((err) => {
      console.log(err);
    });

  }

  closeListview() {
    this.setState({listView: false, listData: null});
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
                {this.props.data.createdtime}
              </span>
            </div>
            <div className="div__blip__body">
              <span>
                {this.props.data.transcription}
              </span>
            </div>
            <div className="div__blip__ctrlbar">
              <span className="span-text-item link" onClick={() => this.showListview('back')}>
                Back
              </span>
              <span className="span-text-item link" onClick={this.playAudio}>
                Play
              </span>
              <span className="span-text-item link" onClick={() => this.showListview('next')}>
                Next
              </span>
            </div>
          </div>
        );
      }
      else {
        blipView = (
          <Listview list={this.state.listData} play={this.props.play} close={this.closeListview}></Listview>
        );
      }


    return (
      <div className="div__blip">
        {blipView}
      </div>
    );
  }
}
