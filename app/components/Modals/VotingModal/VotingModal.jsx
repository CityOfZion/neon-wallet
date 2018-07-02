// @flow
import React, { Component } from 'react'

import BaseModal from '../BaseModal'
import Button from '../../Button'
import styles from './styles.scss'
import classNames from 'classnames'

type Props = {
  hideModal: Function,
  showSuccessNotification: Function,
  dispatch: Function
  // onClick: Function
  // votesAvailable: number
}

type State = {
  infoShowing: boolean,
  confirmationShowing: boolean,
  votes: Object
}

const textStrings = {
  TITLE: 'Vote for consensus node',
  TOP_10_CANDIDATES: 'Top 10 candidates',
  CANDIDATES: 'Candidates',
  NUMBER_OF_VOTES: 'Number of votes',
  CAST_VOTE: 'Cast vote',
  EXPLANATION_TITLE: 'How does voting work?',
  VOTING_EXPLANATION: 'Each NEO node can vote for the candidtates. The number of NEON in the current voting account will be automatically calculated as the number of the candidate\'s votes. When voting for multiple candidates, each candidate gets the votes equal to the NEO number of the current voting account. For example, if there are 100 NEO in the current account and the three candidates are voted for from this account, each candidate receives 100 votes. If NEO in the account is spent after the vote, the candidates\' votes will simultaneously be decreased to the current NEO balance',
  PUBLIC_ADDRESS: 'Public address of candidate',
  CONFIRMATION_TITLE: 'Confirm votes',
  CONFIRMATION_MESSAGE: 'You will be casting <number_of_votes> votes, for each of the following candidates:',
  SUBMIT: 'Submit',
  VOTE_SUCCESS: 'Vote successfully submitted!'
}

const placehoderData = [
  {
    address: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ',
    votes: 111111111
  },
  {
    address: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ',
    votes: 222222222
  },
  {
    address: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ',
    votes: 333333333
  },
  {
    address: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ',
    votes: 444444444
  },
  {
    address: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ',
    votes: 555555555
  },
  {
    address: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ',
    votes: 666666666
  },
  {
    address: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ',
    votes: 777777777
  },
  {
    address: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ',
    votes: 888888888
  },
  {
    address: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ',
    votes: 101010101
  },
];

const votesAvailable = 123;

export default class VotingModal extends Component<Props, State> {

  state = {
    infoShowing: false,
    confirmationShowing: false,
    votes: {}
  }

  componentWillMount () {
    this.showInfoModal = this.showInfoModal.bind(this);
    this.hideInfoModal = this.hideInfoModal.bind(this);
    this.handleNodeSelected = this.handleNodeSelected.bind(this);
    this.handleCastVote = this.handleCastVote.bind(this);
    this.showConfirmationModal = this.showConfirmationModal.bind(this);
    this.hideConfirmationModal = this.hideConfirmationModal.bind(this);
    this.handleVoteSubmit = this.handleVoteSubmit.bind(this);
    this.hasVotes = this.hasVotes.bind(this);
  }


  render () {
    const { hideModal } = this.props
    const { errorMsg, passphrase, pendingLogin } = this.state

    return (
      <BaseModal
        title={textStrings.TITLE}
        hideModal={hideModal}
        style={{
          content: {
            width: '925px',
            height: '700px',
          }
        }}
      >
        <div className={styles.modalContainer}>
          <Button className={styles.infoButton} onClick={this.showInfoModal}>?</Button>
          <div className={styles.contentContainer}>
            <div className={styles.contentHeader}>{textStrings.TOP_10_CANDIDATES}</div>
            <div className={styles.contentBody}>
              <div className={styles.row}>
                <div className={classNames(styles.leftCol, styles.title)}>
                  {textStrings.CANDIDATES}
                </div>
                <div className={classNames(styles.rightCol, styles.title)}>
                  {textStrings.NUMBER_OF_VOTES}
                </div>
              </div>
              {this.renderNodeList()}
            </div>
          </div>
          <Button
            className={styles.submitButton}
            onClick={this.handleCastVote}
            disabled={!this.hasVotes()}
          >{textStrings.CAST_VOTE}</Button>
        </div>
        {this.renderInformationModal()}
        {this.renderVoteConfirmationModal()}
      </BaseModal>
    )
  }

  renderNodeList() {
    return placehoderData.map((data, index) => {
      const {address, votes} = data;
      return (
        <div key={index} className={styles.row}>
          <div className={styles.leftCol}>
            <input className={styles.checkBox} type='checkbox' onClick={() => this.handleNodeSelected(index)} />
            <a href=''>{address}</a>
          </div>
          <div className={styles.rightCol}>
            {votes}
          </div>
        </div>
      )
    })
  }

  handleCastVote() {
    this.hasVotes() && this.showConfirmationModal()
  }

  hasVotes() {
    const {votes} = this.state;
    return Object.keys(votes).reduce((result, key) => result || !!votes[key], false)
  }

  handleNodeSelected(index) {
    const {votes} = this.state;
    this.setState({votes: {...votes, [index]: !votes[index]}})
  }

  showInfoModal() {
    this.setState({infoShowing: true})
  }

  hideInfoModal() {
    this.setState({infoShowing: false})
  }

  showConfirmationModal() {
    this.setState({confirmationShowing: true})
  }

  hideConfirmationModal() {
    this.setState({confirmationShowing: false})
  }

  renderInformationModal() {
    const { infoShowing } = this.state

    return infoShowing && (
      <BaseModal
        title={textStrings.EXPLANATION_TITLE}
        hideModal={this.hideInfoModal}
        style={{
          content: {
            width: '43rem',
            height: '15rem',
          }
        }}
      >
        {textStrings.VOTING_EXPLANATION}
      </BaseModal>
    )
  }

  renderVoteConfirmationModal() {
    const { confirmationShowing, votes } = this.state

    return confirmationShowing && (
      <BaseModal
        title={textStrings.CONFIRMATION_TITLE}
        hideModal={this.hideConfirmationModal}
        style={{
          content: {
            width: '43rem',
            height: '25rem',
          }
        }}
      >
        {textStrings.CONFIRMATION_MESSAGE.replace('<number_of_votes>', votesAvailable)}
        <ul className={styles.addressList}>
          {Object.keys(votes).reduce((elements, key, index) => {
            if (votes[key]) {
              elements.push(
                <li key={index}>{placehoderData[key].address}</li>
              )
            }
            return elements
          }, [])}
        </ul>
        <Button onClick={this.handleVoteSubmit}>{textStrings.SUBMIT}</Button>
      </BaseModal>
    )
  }

  handleVoteSubmit() {
    const { hideModal, dispatch, showSuccessNotification } = this.props
    showSuccessNotification({ message: textStrings.VOTE_SUCCESS })
    hideModal()
  }
}
