// @flow
import React from 'react'
import BaseModal from '../BaseModal'
import styles from './GitHubIssue.scss'
import Panel from '../../Panel'
import {
  GITHUB_ISSUE_LINK,
  AWESOME_NEO_LINK,
  REDDIT_NEO_LINK,
  DISCORD_INVITE_LINK,
} from '../../../core/constants'

type Props = {
  hideModal: () => any,
}

export default class GitHubIssueModal extends React.Component<Props> {
  render() {
    const { shell } = require('electron').remote
    const { hideModal } = this.props
    return (
      <BaseModal
        title="Manage Tokens"
        hideModal={hideModal}
        style={{
          content: {
            width: '550px',
            height: '550px',
          },
        }}
      >
        <div className={styles.IssueContainer}>
          <Panel className={styles.newsPanel}>
            <h3>Support</h3> A gentle reminder, github issues are meant to be
            used by developers for maintaining and improving the codebase, and
            is not the proper location for support issues. Questions such as
            <ul>
              <li>
                <em>"Why can't I log in?" </em>
              </li>
              <li>
                <em>"I lost my private key, is there anyway to recover it?"</em>
              </li>
              <li>
                <em> "Why is my balance not showing?"</em>
              </li>
            </ul>
            should be asked in proper support channels such as the
            <a
              onClick={() => shell.openExternal(REDDIT_NEO_LINK)}
              title={REDDIT_NEO_LINK}
            >
              {' '}
              NEO subreddit
            </a>
            , or the official{' '}
            <a
              onClick={() => shell.openExternal(DISCORD_INVITE_LINK)}
              title={DISCORD_INVITE_LINK}
            >
              {' '}
              NEO Discord Channel.{' '}
            </a>
            You should also check the list of{' '}
            <a
              onClick={() => shell.openExternal(AWESOME_NEO_LINK)}
              title={AWESOME_NEO_LINK}
            >
              {' '}
              frequently asked questions (FAQ)
            </a>{' '}
            to see if your question has been answered there already.
            <h3>Feature Request / Bug Report</h3>
            Thank you for submitting a Github issue here:
            <a
              onClick={() => shell.openExternal(GITHUB_ISSUE_LINK)}
              title={GITHUB_ISSUE_LINK}
            >
              {' '}
              link.
            </a>
          </Panel>
        </div>
      </BaseModal>
    )
  }
}
