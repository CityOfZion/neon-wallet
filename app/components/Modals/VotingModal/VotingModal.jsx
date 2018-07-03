// @flow
import React, { Component } from 'react'

import BaseModal from '../BaseModal'
import Button from '../../Button'
import styles from './styles.scss'
import classNames from 'classnames'

type Props = {
  hideModal: () => any,
  showSuccessNotification: (message: string) => any
};

type State = {
  infoShowing: boolean,
  confirmationShowing: boolean,
  votes: Object
};

const mockData = [
  {
    address: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ1',
    votes: 111111111
  },
  {
    address: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ2',
    votes: 222222222
  },
  {
    address: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ3',
    votes: 333333333
  },
  {
    address: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ4',
    votes: 444444444
  },
  {
    address: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ5',
    votes: 555555555
  },
  {
    address: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ6',
    votes: 666666666
  },
  {
    address: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ7',
    votes: 777777777
  },
  {
    address: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ8',
    votes: 888888888
  },
  {
    address: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ9',
    votes: 101010101
  }
]

const votesAvailable = 123

export default class VotingModal extends Component<Props, State> {
  constructor () {
    super()

    this.state = {
      infoShowing: false,
      confirmationShowing: false,
      votes: {}
    }

    this.showInfoModal = this.showInfoModal.bind(this)
    this.hideInfoModal = this.hideInfoModal.bind(this)
    this.handleNodeSelected = this.handleNodeSelected.bind(this)
    this.handleCastVote = this.handleCastVote.bind(this)
    this.showConfirmationModal = this.showConfirmationModal.bind(this)
    this.hideConfirmationModal = this.hideConfirmationModal.bind(this)
    this.handleVoteSubmit = this.handleVoteSubmit.bind(this)
    this.hasVotes = this.hasVotes.bind(this)
  }

  showInfoModal: Function;
  hideInfoModal: Function;
  handleNodeSelected: Function;
  handleCastVote: Function;
  showConfirmationModal: Function;
  hideConfirmationModal: Function;
  handleVoteSubmit: Function;
  hasVotes: Function;

  render () {
    const { hideModal } = this.props

    return (
      <BaseModal
        title={'Vote for consensus node'}
        hideModal={hideModal}
        style={{
          content: {
            width: '925px',
            height: '700px'
          }
        }}
      >
        <div className={styles.modalContainer}>
          <Button className={styles.infoButton} onClick={this.showInfoModal}>
            ?
          </Button>
          <div className={styles.contentContainer}>
            <div className={styles.contentHeader}>{'Top 10 candidates'}</div>
            <div className={styles.contentBody}>
              <div className={styles.row}>
                <div className={classNames(styles.leftCol, styles.title)}>
                  Candidates
                </div>
                <div className={classNames(styles.rightCol, styles.title)}>
                  Number of votes
                </div>
              </div>
              {this.renderNodeList()}
            </div>
          </div>
          <Button
            className={styles.submitButton}
            onClick={this.handleCastVote}
            disabled={!this.hasVotes()}
          >
            Cast vote
          </Button>
        </div>
        {this.renderInformationModal()}
        {this.renderVoteConfirmationModal()}
      </BaseModal>
    )
  }

  renderNodeList (): Array<React$Node> {
    return mockData.map(
      (
        data: {
          address: string,
          votes: number
        },
        index: number
      ): React$Node => {
        const { address, votes } = data
        return (
          <div key={address} className={styles.row}>
            <div className={styles.leftCol}>
              <input
                className={styles.checkBox}
                type='checkbox'
                onClick={() => this.handleNodeSelected(index)}
              />
              <a href=''>{address}</a>
            </div>
            <div className={styles.rightCol}>{votes}</div>
          </div>
        )
      }
    )
  }

  handleCastVote () {
    this.hasVotes() && this.showConfirmationModal()
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

  showInfoModal () {
    this.setState({ infoShowing: true })
  }

  hideInfoModal () {
    this.setState({ infoShowing: false })
  }

  showConfirmationModal () {
    this.setState({ confirmationShowing: true })
  }

  hideConfirmationModal () {
    this.setState({ confirmationShowing: false })
  }

  renderInformationModal () {
    const { infoShowing } = this.state

    return (
      infoShowing && (
        <BaseModal
          title='How does voting work?'
          hideModal={this.hideInfoModal}
          style={{
            content: {
              width: '43rem',
              height: '15rem'
            }
          }}
        >
          Each NEO node can vote for the candidtates. The number of NEON in the current voting account will be automatically calculated as the number of the candidate's votes. When voting for multiple candidates, each candidate gets the votes equal to the NEO number of the current voting account. For example, if there are 100 NEO in the current account and the three candidates are voted for from this account, each candidate receives 100 votes. If NEO in the account is spent after the vote, the candidates' votes will simultaneously be decreased to the current NEO balance
        </BaseModal>
      )
    )
  }

  renderVoteConfirmationModal () {
    const { confirmationShowing, votes } = this.state

    return (
      confirmationShowing && (
        <BaseModal
          title='Confirm votes'
          hideModal={this.hideConfirmationModal}
          style={{
            content: {
              width: '43rem',
              height: '25rem'
            }
          }}
        >
          {`You will be casting ${votesAvailable.toString()} votes, for each of the following candidates:`}
          <ul className={styles.addressList}>
            {Object.keys(votes).reduce((elements, key, index) => {
              if (votes[key]) {
                elements.push(
                  <li key={index}>{mockData[Number(key)].address}</li>
                )
              }
              return elements
            }, [])}
          </ul>
          <Button onClick={this.handleVoteSubmit}>Submit</Button>
        </BaseModal>
      )
    )
  }

  handleVoteSubmit () {
    const { hideModal, showSuccessNotification } = this.props
    showSuccessNotification('Vote successfully submitted!')
    hideModal()
  }
}
