import superagent from 'superagent';
import EventEmitter from 'eventemitter2';
import Dispatcher from 'dispatcher/dispatcher';

import FeedConstants from 'constants/feed.constants.json';
import FlickerAuth from 'constants/flicker.constants.json';

const CHANGE_EVENT = 'CHANGE';
const base         = `https://api.flickr.com/services/rest/?api_key=${FlickerAuth.API_KEY}&format=rest&format=json&nojsoncallback=1`;

let feedStories = [];

function fetchStories() {
  superagent
    .get(`${base}&method=flickr.photos.search&tags=cats&sort=interestingness-desc&safe_search=1&per_page=10&page=1`)
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