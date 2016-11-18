import _ from 'lodash';

class Model {
  constructor() {
    this.data = null;
    this.searchingFor = null;
  }

  getData() {
    return this.data;
  }

  getSearchingFor() {
    return this.searchingFor;
  }

  setData(data) {
    this.data = _.cloneDeep(data);
  }

  setSearchingFor(word) {
    this.searchingFor = _.cloneDeep(word);
  }
}

const store = new Model();

export default store;
