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
    return (
      <Card>
        <CardHeader title={ this.props.title } subtitle="By the Dude"/>
        <CardMedia>
          <img src={ this.props.image }/>
        </CardMedia>
      </Card>
    );
  }
}
