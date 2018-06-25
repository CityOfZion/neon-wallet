import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Button from 'components/Button'

storiesOf('Components/Button', module).add('with text', () => (
  <Button onClick={action('clicked')} style={{ width: '100px' }}>
    Hello Button
  </Button>
))
