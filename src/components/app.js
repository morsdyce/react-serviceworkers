import React, { Component } from 'react';

import 'roboto-fontface';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';

import { Header } from 'components/header';
import { Feed } from 'components/feed';
import NotificationSystem from 'react-notification-system';
import { FeedActions } from 'actions/feed';

export class App extends Component {

  constructor() {
    super();

    this.state = {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
    }

    this.handleUpdates = this.handleUpdates.bind(this);
  }

  componentDidMount() {
    navigator.serviceWorker.addEventListener('message', this.handleUpdates);
  }

  componentWillUnMount() {
    navigator.serviceWorker.removeEventListener('message', this.handleUpdates);
  }

  handleUpdates(event) {
    if (event.data.type === 'stories::update') {
      console.log('got an update');

      this.notificationSystem.addNotification({
        message: 'New Images Available!',
        level: 'success',
        action: {
          label: 'Load Images',
          callback: () => {
            console.log('fetching new data');
            FeedActions.fetch('dogs');
          }
        }
      });
    }
  }

  static get childContextTypes() {
    return {
      muiTheme: React.PropTypes.object
    };
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  }

  render() {
    return (
      <div>
        <Header />
        <Feed />
        <NotificationSystem ref={ (node) => { this.notificationSystem = node; }} />
      </div>
    );
  }

}
