// @flow
import { compose, withState } from 'recompose'

import ContactForm from './ContactForm'

export default compose(
  withState('name', 'setName', ({ name }) => name || ''),
  withState('address', 'setAddress', ({ address }) => address || '')
)(ContactForm)
