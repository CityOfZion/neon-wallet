// @flow
import React, { Component } from 'react'

import BaseModal from '../BaseModal'
import Button from '../../Button'
import styles from './styles.scss'
import classNames from 'classnames'
import { shell } from 'electron'

type Props = {
  hideModal: () => any,
  showSuccessNotification: ({message: string}) => any
}

type State = {
  isConfirming: boolean,
  votes: Object
}

const mockTotalVotesData = [
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
    votes: 999999999
  },
  {
    address: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ10',
    votes: 101010101
  },
  {
    address: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ12',
    votes: 121212121
  },
  {
    address: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ13',
    votes: 131313131
  },
  {
    address: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ14',
    votes: 141414141
  },
  {
    address: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ15',
    votes: 151515151
  },
  {
    address: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ16',
    votes: 161616161
  },
  {
    address: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ17',
    votes: 171717171
  },
  {
    address: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ18',
    votes: 181818181
  },
  {
    address: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ19',
    votes: 191919191
  },
  {
    address: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ20',
    votes: 202020202
  }
]

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
    return mockTotalVotesData.map(
      (
        data: {
          address: string,
          votes: number
        },
        index: number
      ): React$Node => {
        const { address, votes } = data
        const myVotes = mockAddressVotesData[address] || 0
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
                <li key={index}>{mockTotalVotesData[Number(key)].address}</li>
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
