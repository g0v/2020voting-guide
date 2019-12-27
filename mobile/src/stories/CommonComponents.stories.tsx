import React from 'react'
import DecoratedTitle from '../components/CommonComponents/DecoratedTitle'
import { addDecorator } from '@storybook/react'
import { themeDecorator } from './Decorators'
import SingleConstituencyCadidateItem from '../components/Search/SearchResultItems/SingleConstituencyCadidateItem'
import { singleConstituencyCandidate } from './__mocks/commonComponents-mocks'
import { useFnsByKeyCode } from '../components/Search/functions/useFnsByKeyCode'
import { Typography } from '@material-ui/core'

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

const TestUseFnsByKeyCodeComp = () => {
  const confirmFn = () => window.alert('Confirm')
  const escapeFn = () => window.alert('Escape')
  const { index } = useFnsByKeyCode({
    lastIndex: 10,
    confirmFn,
    escapeFn,
  })
  return (
    <Typography variant={'h2'}>{index}</Typography>
  )
}

export const testUseFnsByKeyCode = () => {
  return (
    <TestUseFnsByKeyCodeComp />
  )
}