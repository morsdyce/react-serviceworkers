import assign from 'object-assign';
import EventEmitter from 'eventemitter2';
import Dispatcher from 'react-minesweeper/dispatcher/dispatcher';

const CHANGE_EVENT = 'CHANGE';

let GameStore = assign({}, EventEmitter.prototype, {

  emitChange(data) {
    this.emit(CHANGE_EVENT, data);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

GameStore.dispatchToken = Dispatcher.register(function (action) {

  switch (action.type) {

  }

});

export default GameStore;