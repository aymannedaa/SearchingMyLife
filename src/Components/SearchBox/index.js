import React, {Component} from 'react';
import $ from 'jquery';
import store from '../../store';
require('./SearchBox.scss');

export default class SearchBox extends Component {
  constructor() {
    super();
    this.search = this.search.bind(this);
  }
  search(event) {
    const that = this;
    const searchingFor = $(event.target).val();
    if(event.keyCode === 13 && searchingFor !== '') {
      $.ajax({
        url: '/search/words/' + searchingFor,
        type: 'GET',
      }).done((data) => {
        store.setSearchingFor(searchingFor);
        store.setData(data);
        that.props.update();
      }).fail((err) => {
        console.log(err);
      });
    }
  }
  render() {
    return (
      <div className="div__searchbox">
        <input
        className="input-text__search"
        type="text"
        placeholder="Enter your query ..."
        onKeyDown={this.search}/>
      </div>
    );
  }
}
