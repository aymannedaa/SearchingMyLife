import React, {Component} from 'react';
import $ from 'jquery';
import moment from 'moment';
require('./Listview.scss');

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

export default class Listview extends Component {
  constructor() {
    super();
    this.playAudio = this.playAudio.bind(this);
    this.resizeImage = this.resizeImage.bind(this);
  }

  playAudio(filename, duration) {
    this.props.play({
      filename: filename,
      duration: duration
    });
  }

  resizeImage(event) {
    const parentWidth = $(event.target).parent().css('width').replace("px", "");
    const widthToSet = parseFloat(parentWidth) / 6;
    $(event.target).css('width', widthToSet + 'px');
  }

  render() {
    return (
      <div className="div__listview">
        <div className="div__listitem__header">
          <span className="span__direction">
            {this.props.direction === 'back' ? 'Before' : 'After'}
          </span>
          <span>
            {moment(this.props.timestamp).format('YYYY')}
          </span>
          <span>
            {moment(this.props.timestamp).format('ddd, MMM Do') + ' '}
          </span>
          <span>
            {moment(this.props.timestamp).format('h:mm a') + ' '}
          </span>
          <img className="img__close" onClick={this.props.close} src="icons/close.svg"></img>
        </div>
        {!this.props.imageView ?
          <div className="div__listitem">
            <ul>
              {this.props.list.map((item, index) => {
                return <li key={index}>
                  <span className="link" onClick={() => {this.playAudio(item.filename, item.duration)}}>{item.transcription}</span>
                </li>
              })}
            </ul>
          </div>
          :
          <div className="div__image-gallery">
            {this.props.list.map((fileObj, index) => {
              return <img
                key={index}
                src={'/sendimage/' + fileObj.filename}
                onLoad={this.resizeImage}
                onClick={openModal}></img>;
            })}
          </div>
        }
      </div>
    );
  }
}
