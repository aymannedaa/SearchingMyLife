import React, {Component} from 'react';
import Listview from './Listview';
import $ from 'jquery';
import _ from 'lodash';
import moment from 'moment';
require('./Blip.scss');


function openModal(event) {
    const src = $(event.target).attr('src');
    const largeImage = $('<img src=' + src + '></img>');
    const closeIcon = $('<img class="close" src="icons/close.svg"></img>');
    closeIcon.on('click', function() {
      $('.div__modal').remove();
    });
    const modalDiv = $('<div class="div__modal"></div>');
    const modalHeaderDiv = $('<div class="div__modal__header"></div>');

    modalDiv.appendTo('body');
    modalHeaderDiv.appendTo(modalDiv);
    closeIcon.appendTo(modalHeaderDiv);
    largeImage.appendTo(modalDiv);
  }



export default class Blip extends Component {
  constructor() {
    super();
    this.state = {listView: false, activeTab: 'tabText'};
    this.showListviewText = this.showListviewText.bind(this);
    this.showListviewImage = this.showListviewImage.bind(this);
    this.closeListview = this.closeListview.bind(this);
    this.playAudio = this.playAudio.bind(this);

    this.setAsActiveTab = this.setAsActiveTab.bind(this);
    this.fetchImageMetadata = this.fetchImageMetadata.bind(this);
    this.resizeImage = this.resizeImage.bind(this);
  }

  showListviewImage(direction) {
    let url = '';
    let timestamp = null;
    if(direction === 'back') {
      timestamp = this.props.data.createdtime;
      url = '/search/image/before/' + timestamp;
    }
    else if(direction === 'next') {
      timestamp = this.props.data.endtime;
      url = '/search/image/after/' + timestamp;
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

  showListviewText(direction) {
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

  fetchImageMetadata() {
    const url = '/search/image/between/' + this.props.data.createdtime + '/' + this.props.data.endtime;
    $.ajax({
      url: url,
      type: 'GET'
    }).done((data) => {
      const imageFilenames = _.map(data, (item) => item.filename);
      this.setState({imageFilenames: imageFilenames, activeTab: 'tabImage'});
    }).fail((err) => {
      console.log(err);
    })
  }

  setAsActiveTab(event) {
    if((this.refs.tab_text === event.target) || (this.refs.tab_text === $(event.target).closest('div').get(0))) {
      this.setState({activeTab: 'tabText'});
    }
    else if((this.refs.tab_image === event.target) || (this.refs.tab_image === $(event.target).closest('div').get(0))) {
      this.fetchImageMetadata();
    }
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

  resizeImage(event) {
    const parentWidth = $(event.target).parent().css('width').replace("px", "");
    const widthToSet = parseFloat(parentWidth) / 6;
    $(event.target).css('width', widthToSet + 'px');
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
              <div className="div__blip__body__tabs">
                <div
                  ref="tab_text"
                  className={(this.state.activeTab === 'tabText') ? "div__active" : ""}
                  onClick={this.setAsActiveTab}>
                  <img className="img__text" src="icons/text.svg"></img>
                </div>
                <div
                  ref="tab_image"
                  className={(this.state.activeTab === 'tabImage') ? "div__active" : ""}
                  onClick={this.setAsActiveTab}>
                  <img className="img__image" src="icons/image.svg"></img>
                </div>
              </div>
              <div className="div__blip__body__content">
                {(this.state.activeTab === 'tabText') ?
                  <p>
                    {this.props.data.transcription}
                  </p>
                  :
                  <div className="div__blip__body__content__image-gallery">
                    {this.state.imageFilenames.map((filename, index) => {
                      return <img
                        key={index}
                        src={'/sendimage/' + filename}
                        onLoad={this.resizeImage}
                        onClick={openModal}></img>;
                    })}
                  </div>
                }
              </div>

            </div>
            <div className="div__blip__ctrlbar">
              <span className="span-text-item link" onClick={() => {
                if(this.state.activeTab === 'tabText') {
                  this.showListviewText('back')
                }
                else if(this.state.activeTab === 'tabImage') {
                  this.showListviewImage('back');
                }
              }}>
                Back
              </span>
              <span
                className={(this.state.activeTab === 'tabText') ? "span-text-item link" : "hidden"}
                onClick={this.playAudio}>
                Play
              </span>
              <span className="span-text-item link" onClick={() => {
                if(this.state.activeTab === 'tabText') {
                  this.showListviewText('next')
                }
                else if(this.state.activeTab === 'tabImage') {
                  this.showListviewImage('next');
                }
              }}>
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
          timestamp={this.state.timestamp}
          imageView={(this.state.activeTab === 'tabImage') ? true : false}></Listview>
        );
      }


    return (
      <div className="div__blip">
        {blipView}
      </div>
    );
  }
}
