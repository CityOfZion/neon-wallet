import ArrowBack from 'react-icons/lib/md/arrow-back';
import { Link, withRouter } from 'react-router';
import React from 'react';
import ReactTooltip from 'react-tooltip'

const BackButton = ({ router }) =>
  <div id="back" data-tip data-for="backTip">
    <ArrowBack onClick={() => router.goBack()}/>
    <ReactTooltip class="solidTip" id="backTip" place="bottom" type="dark" effect="solid">
      <span>Back</span>
    </ReactTooltip>
  </div>;

export default withRouter(BackButton);
