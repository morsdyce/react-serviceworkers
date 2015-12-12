import React, { Component } from 'react';

import FeedStore from 'stores/feed';
import { FeedActions } from 'actions/feed';
import { Story } from 'components/story';

export class Feed extends Component {

  constructor() {
    super();

    this.state = {
      stories: FeedStore.getStories()
    };
  }

  componentWillMount() {
    FeedStore.addChangeListener(this._updateStories.bind(this));

    FeedActions.fetch();
  }

  componentWillUnmount() {
    FeedStore.removeChangeListener(this._updateStories.bind(this));
  }

  _updateStories() {
    this.setState({ stories: FeedStore.getStories() })
  }

  renderStories() {
    console.log(this.state.stories);
    return this.state.stories.map((story) => (
      <Story key={ story.id } title={ story.title } image={ story.image }/>
    ));
  }

  render() {
    return (
      <div>
        { this.renderStories() }

      </div>
    )
  }

}
