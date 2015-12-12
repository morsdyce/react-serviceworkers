import Dispatcher from 'dispatcher/dispatcher';
import FeedConstants from 'constants/feed.constants.json';

export class FeedActions {

  static fetch() {
    Dispatcher.dispatch({
      type: FeedConstants.FETCH
    });
  }

}
