import React, { Component } from 'react';

import 'roboto-fontface';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';

import { Header } from 'components/header';
import { Feed } from 'components/feed';

export class App extends Component {

  constructor() {
    super();

    this.state = {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
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
      </div>
    );
  }

}
