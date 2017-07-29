import { Link } from 'react-router';
import React from 'react';
import SplitPane from 'react-split-pane';

import { connect } from 'react-redux';

import BackButton from './BackButton';

const Settings = ({ explorer }) => (
  <div id="settingsPage">
    <SplitPane className="navSplit" split="horizontal" size="40px" allowResize={false}>
      <div>
        <BackButton />
        <div id="title">SETTINGS</div>
      </div>
      <div id="settingsList">
        <Link id="setting" to="/settings/explorer">Blockchain Explorer: {explorer.name}</Link>
      </div>
    </SplitPane>
  </div>
);

const mapStateToProps = (state) => ({
  explorer: state.settings.explorer,
});

export default connect(mapStateToProps)(Settings);
