import React from 'react'
import DecoratedTitle from '../components/CommonComponents/DecoratedTitle'
import { addDecorator } from '@storybook/react'
import { themeDecorator } from './Decorators'
import SingleConstituencyCadidateItem from '../components/Search/SearchResultItems/SingleConstituencyCadidateItem'
import { singleConstituencyCandidate } from './__mocks/commonComponents-mocks'

addDecorator(themeDecorator)

export default ({
  title: 'common components'
})

export const decoratedTitle = () => (
  <DecoratedTitle title={'Title'} />
)

export const constituencyCandiateItem = () => (
  <SingleConstituencyCadidateItem {...singleConstituencyCandidate} />
)