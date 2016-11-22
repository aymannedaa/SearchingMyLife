import React, {Component} from 'react';
import Listview from './Listview';
import $ from 'jquery';
import moment from 'moment';
require('./Blip.scss');

export default class Blip extends Component {
  constructor() {
    super();
    this.months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    this.state = {listView: false};
    this.getMonthName = this.getMonthName.bind(this);
    this.showListview = this.showListview.bind(this);
    this.closeListview = this.closeListview.bind(this);
    this.playAudio = this.playAudio.bind(this);
  }

  getMonthName(month) {
    return this.months[month];
  }

  showListview(direction) {
    const word = this.props.searchingFor;
    let url = '';
    let timestamp = null;
    if(direction === 'back') {
      timestamp = this.props.data.createdtime;
      url = '/search/before/' + timestamp;
    }
    else if(direction === 'next') {
      timestamp = this.props.data.endtime;
      url = '/search/after/' + timestamp;
    }
    $.ajax({
      url: url,
      type: 'GET',
    }).done((data) => {
      //store.setData(data);
      //that.props.update();
      this.setState({listView: true, listData: data, direction: direction, timestamp: timestamp});
    }).fail((err) => {
      console.log(err);
    });

  }

  closeListview() {
    this.setState({listView: false, listData: null, direction: null, timestamp: null});
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
              <span className="span__year">
                {moment(this.props.data.createdtime).format('YYYY')}
              </span>
              <span className="span__dayandmonth">
                {moment(this.props.data.createdtime).format('ddd, MMM Do') + ' '}
              </span>
              <span className="span__time">
                {moment(this.props.data.createdtime).format('h:mm a') + ' '}
              </span>
            </div>
            <div className="div__blip__body">
              <p>
                {this.props.data.transcription}
              </p>
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
          <Listview
          list={this.state.listData}
          play={this.props.play}
          close={this.closeListview}
          direction={this.state.direction}
          timestamp={this.state.timestamp}></Listview>
        );
      }


    return (
      <div className="div__blip">
        {blipView}
      </div>
    );
  }
}
