import React from 'react'
import { shallow, mount } from 'enzyme'
import { progressValues } from 'spunky'

import { createStore, provideStore } from '../testHelpers'
import Claim from '../../app/containers/Claim/Claim'
import IntlWrapper from '../../app/components/Root/IntlWrapper'
import { DEFAULT_LANGUAGE } from '../../app/core/constants'

const { LOADED } = progressValues

const initialState = {
  spunky: {
    settings: {
      batch: false,
      progress: LOADED,
      data: {
        language: DEFAULT_LANGUAGE,
      },
      loadedCount: 1,
    },
  },
}

describe('Claim', () => {
  const props = {
    doGasClaim: () => {},
    disableClaimButton: false,
    claimAmount: '1.25406935',
  }

  test('should render claim GAS button as enabled', () => {
    const wrapper = shallow(<Claim {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should render claim GAS button as disabled', () => {
    const wrapper = shallow(<Claim {...props} disableClaimButton />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should claim GAS when button is clicked', () => {
    const claimSpy = jest.fn()

    const store = createStore(initialState)
    const wrapper = mount(
      provideStore(
        <IntlWrapper>
          <Claim {...props} doGasClaim={claimSpy} />
        </IntlWrapper>,
        store,
      ),
    )

    wrapper.find('button#claim').simulate('click')

    expect(claimSpy).toHaveBeenCalled()
  })

  test('Claim button should be disabled in watchOnly', () => {
    const claimSpy = jest.fn()
    const watchOnlyProps = { ...props }
    watchOnlyProps.isWatchOnly = true
    const store = createStore(initialState)

    const wrapper = mount(
      provideStore(
        <IntlWrapper>
          <Claim {...watchOnlyProps} doGasClaim={claimSpy} />
        </IntlWrapper>,
        store,
      ),
    )
    expect(claimSpy).toHaveBeenCalledTimes(0)
    expect(wrapper.find('button#claim').prop('disabled')).toBeTruthy()
  })
})
