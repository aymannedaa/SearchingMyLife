import _ from 'lodash';

class Model {
  constructor() {
    this.data = null;
  }

  getData() {
    return this.data;
  }

  setData(data) {
    this.data = _.cloneDeep(data)
  }
}

const store = new Model();

export default store;
