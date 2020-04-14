import React, { Component } from 'react'
import { shallow, mount } from 'enzyme'

import LanguageSelect from '../../../../app/components/Inputs/LanguageSelect'
import { LANGUAGES } from '../../../../app/core/constants'

describe('LanguageSelect', () => {
  const props = {
    value: LANGUAGES.VIETNAMESE.value,
    items: Object.keys(LANGUAGES).map(key => LANGUAGES[key]),
  }

  test('should render without crashing', () => {
    const wrapper = shallow(<LanguageSelect {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should render the VIETNAMESE flag when passed VIETNAMESE value', () => {
    const wrapper = shallow(<LanguageSelect {...props} />)
    expect(
      wrapper
        .find('#selected-lang-country-flag')
        .children()

        .props().alt,
    ).toEqual(LANGUAGES.VIETNAMESE.label)
  })

  test('should render the CHINESE flag when passed CHINESE value', () => {
    const chinaProps = {
      ...props,
      value: LANGUAGES.CHINESE.value,
    }
    const wrapper = shallow(<LanguageSelect {...chinaProps} />)
    expect(
      wrapper
        .find('#selected-lang-country-flag')
        .children()

        .props().alt,
    ).toEqual('中文')
  })

  test('should render the CHINESE flag when passed CHINESE value', () => {
    const props = {
      ...props,
      value: LANGUAGES.CHINESE.value,
    }
    const wrapper = shallow(<LanguageSelect {...props} />)
    expect(
      wrapper
        .find('#selected-lang-country-flag')
        .children()

        .props().alt,
    ).toEqual('中文')
  })

  test('should render the default flag (ENGLISH) when passed undefined value', () => {
    const props = {
      ...props,
      value: undefined,
    }
    const wrapper = shallow(<LanguageSelect {...props} />)
    expect(
      wrapper
        .find('#selected-lang-country-flag')
        .children()

        .props().alt,
    ).toEqual(LANGUAGES.ENGLISH.label)
  })
})
