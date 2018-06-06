import superagent from 'superagent';
import EventEmitter from 'eventemitter2';
import Dispatcher from 'dispatcher/dispatcher';

import FeedConstants from 'constants/feed.constants.json';

const CHANGE_EVENT = 'CHANGE';

let feedStories = [];

function fetchStories() {
  superagent
    .get('http://localhost:3000/photoList')
    .end((err, res) => {
      let images = res.body.photos.photo.map(mapToStory);
      feedStories = [...images, ...feedStories];
      FeedStore.emitChange();
    });
}

function mapToStory(story) {
  return {
    id: story.id,
    title: story.title,
    image: `https://farm${story.farm}.staticflickr.com/${story.server}/${story.id}_${story.secret}.jpg`
  };
}

let FeedStore = Object.assign({}, EventEmitter.prototype, {

  getStories() {
    return feedStories;
  },

  emitChange(data) {
    this.emit(CHANGE_EVENT, data);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.off(CHANGE_EVENT, callback);
  }

});

FeedStore.dispatchToken = Dispatcher.register(function (action) {

  switch (action.type) {
    case FeedConstants.FETCH:
      fetchStories();
      break;
  }

});

export default FeedStore;
