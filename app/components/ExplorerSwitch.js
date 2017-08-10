import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setExplorer } from '../modules/explorer';

class ExplorerSwitch extends Component {
  componentDidMount = () => {
    this.toggleExplorer = this.toggleExplorer.bind(this);
  }
  
  toggleExplorer(){
    const explorer = this.props.explorer.label === 'Antcha' ? 'NeoTracker' : 'Antcha';
    this.props.dispatch( setExplorer(explorer) );
  }


  render = () =>
    <div id="explorerSwitch">
      <span className="transparent">Explorer: </span>
      <span className="explorerName" onClick={() => this.toggleExplorer()}>{this.props.explorer.label}</span>
    </div>;

}

const mapStateToProps = (state) => ({
  explorer: state.explorer.selected
});

ExplorerSwitch = connect(mapStateToProps)(ExplorerSwitch);

export default ExplorerSwitch;
