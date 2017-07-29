import { Link, withRouter } from 'react-router';
import React from 'react';
import SplitPane from 'react-split-pane';

import { connect } from 'react-redux';

import { BLOCKCHAIN_EXPLORERS } from '../utils/constants';

import BackButton from './BackButton';

import { setBlockchainExplorer } from '../actions';

const Settings = ({ dispatch, router }) => (
  <div id="settingsPage">
    <SplitPane className="navSplit" split="horizontal" size="40px" allowResize={false}>
      <div>
        <BackButton />
        <div id="title">CHOOSE BLOCKCHAIN EXPLORER</div>
      </div>
      <div id="settingsList">
        {Object.values(BLOCKCHAIN_EXPLORERS).map(explorer => (
          <a
            id="setting"
            onClick={() => {
              dispatch(setBlockchainExplorer(explorer));
              router.goBack();
            }}
          >
            {explorer.name} - {explorer.main}
          </a>
        ))}
      </div>
    </SplitPane>
  </div>
);

const mapStateToProps = (state) => ({
});

export default withRouter(connect(mapStateToProps)(Settings));
