// @flow
import React, { Component } from 'react'

import BaseModal from '../BaseModal'
import Button from '../../Button'
import styles from './styles.scss'
import classNames from 'classnames'
import { shell } from 'electron'

type Props = {
  hideModal: () => any,
  showSuccessNotification: ({message: string}) => any,
  // votes: Array<any>,
  validators: Array<{active: boolean, publickey: string, votes: string}>,
}

type State = {
  isConfirming: boolean,
  votes: Object
}

const mockAddressVotesData = {
  'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ1': 15,
  'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ3': 15,
  'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ5': 15,
  'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ7': 15,
  'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ9': 15
}

const votesAvailable = 123

export default class VotingModal extends Component<Props, State> {
  constructor () {
    super()

    this.state = {
      isConfirming: false,
      votes: {}
    }

    this.handleNodeSelected = this.handleNodeSelected.bind(this)
    this.handleCastVote = this.handleCastVote.bind(this)
    this.showConfirmation = this.showConfirmation.bind(this)
    this.hideConfirmation = this.hideConfirmation.bind(this)
    this.handleVoteSubmit = this.handleVoteSubmit.bind(this)
    this.hasVotes = this.hasVotes.bind(this)
  }

  static defaultProps = {
    validators: [],
    votes: []
  }

  handleNodeSelected: Function
  handleCastVote: Function
  showConfirmation: Function
  hideConfirmation: Function
  handleVoteSubmit: Function
  hasVotes: Function

  render () {
    const { hideModal } = this.props
    const { isConfirming } = this.state

    return (
      <BaseModal
        title='Vote for consensus node'
        hideModal={hideModal}
        style={{
          content: {
            width: '57.9125rem',
            height: '43.75rem'
          }
        }}
      >
        <div className={styles.modalContainer}>
          <div className={styles.votingInfo}>
            Each NEO node can vote for the candidates. The number of NEO in the current voting account will be automatically calculated as the number of the candidate's votes. When voting for multiple candidates, each candidate gets the votes equal to the NEO number of the current voting account. For example, if there are 100 NEO in the current account and three candidates are voted for from this account, each candidate receives 100 votes. If NEO in the account is spent after the vote, the candidates' votes will simultaneously be decreased to the current NEO balance.
          </div>
          <a href='#' onClick={() => shell.openExternal('http://docs.neo.org/en-us/node/gui.html#election-and-voting')}>More info</a>
          <div className={styles.contentContainer}>
            <div className={styles.contentHeader}>{isConfirming ? 'Confirm votes' : 'Available candidates'}</div>
            {isConfirming ? this.renderVoteConfirmation() : this.renderContentBody()}
          </div>
          <div>
            {this.renderCancelButton()}
            <Button
              className={styles.submitButton}
              onClick={isConfirming ? this.handleVoteSubmit : this.handleCastVote}
              disabled={!this.hasVotes()}
            >
              {isConfirming ? 'Submit' : 'Cast vote'}
            </Button>
          </div>
        </div>
      </BaseModal>
    )
  }

  renderContentBody () {
    return (
      <div className={styles.contentBody}>
        <div className={styles.titleRow}>
          <div className={classNames(styles.leftCol, styles.title)}>
            Candidates
          </div>
          <div className={classNames(styles.rightCol, styles.title)}>
            Total votes
          </div>
          <div className={classNames(styles.rightCol, styles.title)}>
            My votes
          </div>
        </div>
        <div className={styles.scrollContainer}>
          <div className={styles.nodeListContainer}>
            {this.renderNodeList()}
          </div>
        </div>
      </div>
    )
  }

  renderCancelButton (): React$Node {
    const { isConfirming } = this.state

    return isConfirming && (
      <Button
        className={styles.cancelButton}
        onClick={this.hideConfirmation}
        cancel
      >
        Cancel
      </Button>
    )
  }

  renderNodeList (): Array<React$Node> {
    return this.props.validators.map(
      (
        data: {
          publickey: string,
          votes: string,
          active: boolean
        },
        index: number
      ): React$Node => {
        const { publickey, votes, active } = data
        const myVotes = mockAddressVotesData[publickey] || 0
        return (
          <div key={publickey} className={styles.row}>
            <div className={styles.leftCol}>
              <input
                className={styles.checkBox}
                type='checkbox'
                disabled={!active}
                onClick={() => this.handleNodeSelected(index)}
              />
              <span className={styles.publickey}>{publickey}</span>
            </div>
            <div className={styles.rightCol}>{votes}</div>
            <div className={styles.rightCol}>{myVotes}</div>
          </div>
        )
      }
    )
  }

  handleCastVote () {
    this.hasVotes() && this.showConfirmation()
  }

  hasVotes () {
    const { votes } = this.state
    return Object.keys(votes).reduce(
      (result, key) => result || !!votes[key],
      false
    )
  }

  handleNodeSelected (index: number) {
    const { votes } = this.state
    this.setState({
      votes: { ...votes, [index.toString()]: !votes[index.toString()] }
    })
  }

  showConfirmation () {
    this.setState({ isConfirming: true })
  }

  hideConfirmation () {
    this.setState({ isConfirming: false })
  }

  renderVoteConfirmation () {
    const { votes } = this.state

    return (
      <div className={styles.confirmationView}>
        {`You will be casting ${votesAvailable.toString()} votes, for each of the following candidates:`}
        <ul className={styles.addressList}>
          {Object.keys(votes).reduce((elements, key, index) => {
            if (votes[key]) {
              elements.push(
                <li key={index}>{this.props.validators[Number(key)].publickey}</li>
              )
            }
            return elements
          }, [])}
        </ul>
      </div>
    )
  }

  handleVoteSubmit () {
    const { hideModal, showSuccessNotification } = this.props
    showSuccessNotification({ message: 'Vote successfully submitted!' })
    hideModal()
  }
}
