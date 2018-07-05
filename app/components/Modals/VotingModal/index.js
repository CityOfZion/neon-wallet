// @flow
import { compose } from 'recompose'
import { withCall, withData } from 'spunky'

import VotingModal from './VotingModal'
import voteActions from '../../../actions/voteActions'
import withNetworkData from '../../../hocs/withNetworkData'
import withAuthData from '../../../hocs/withAuthData'

const mapVoteDataToProps = (voteData: Object): {
  votes: number,
  validators: any
} => voteData && ({
  votes: voteData.votes,
  validators: voteData.validators
})

export default compose(
  withNetworkData(),
  withAuthData(),
  withCall(voteActions),
  withData(voteActions, mapVoteDataToProps)
)(VotingModal)
