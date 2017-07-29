import { Link } from 'react-router';
import React from 'react';
import ReactTooltip from 'react-tooltip'
import Settings from 'react-icons/lib/md/settings';

export default () =>
  <div id="settings" data-tip data-for="settingsTip">
    <Link to="/settings"><Settings /></Link>
    <ReactTooltip class="solidTip" id="settingsTip" place="bottom" type="dark" effect="solid">
      <span>Settings</span>
    </ReactTooltip>
  </div>;
