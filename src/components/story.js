import React, { Component, PropTypes } from 'react';

import { Card, CardHeader, CardMedia } from 'material-ui';

export class Story extends Component {

  static propTypes() {
    return {
      title: PropTypes.string.required,
      image: PropTypes.string.required
    }
  }

  render() {
    const title = this.props.title === 'undefined'
      ? 'Untitled'
      : this.props.title;

    return (
      <Card>
        <h4>{ title }</h4>
        <CardMedia>
          <img src={ this.props.image }/>
        </CardMedia>
      </Card>
    );
  }
}
