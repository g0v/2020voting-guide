import React, { useEffect } from 'react'
import { Box, Typography } from '@material-ui/core'
import { AllCandidatesAndParties } from './functions/getAllCandidatesAndParties'
import Loading from '../CommonComponents/Loading'
import PartyCard from '../PartyCandidates/PartyCard'
import SingleCandidateItem from '../Party/SingleCandidateItem'
import SingleConstituencyCadidateItem from './SearchResultItems/SingleConstituencyCadidateItem'
import LoadingAndError from '../CommonComponents/LoadingAndError'
import DecoratedTitle from '../CommonComponents/DecoratedTitle'
import { SingleCandidateInParty } from './functions/getPartyCandidated'
import { SingleConstituencyCandidate } from './functions/getAllConstituencyCandidates'
import { SingleParty } from './functions/getAllParties'
import SingleCandidateItemWithPartyName from './SearchResultItems/SingleCandidateItemWithPartyName'
import ResultItemCardWrapper from './SearchResultItems/ResultItemCardWrapper'

type Props = {
  loading: boolean,
  error: any
  data: AllCandidatesAndParties | undefined,
}

export const handleNullValueToString = (val: string | null) => (
  typeof val === 'string' ? val : ''
) 

export const ConstituecyCandidatesSearchResults = ({
  constituecyCandidates
}: {
  constituecyCandidates: SingleConstituencyCandidate[]
}) => {
  return (
    <>
      {constituecyCandidates.length > 0 && (
        <DecoratedTitle 
          title={'區域立委'} />
      )}
      {constituecyCandidates.map((c, i) => (
        <SingleConstituencyCadidateItem
          key={i}  
          {...c} />
      ))}
    </>
  )
}

export const PartyCandidatesSearchResults = ({
  partyCandidates
}: {
  partyCandidates: SingleCandidateInParty[]
}) => {
  return (
    <>
      {partyCandidates.length > 0 && (
        <DecoratedTitle 
          title={'不分區立委'} />
      )}
      {partyCandidates.map((c, i) => (
        <SingleCandidateItemWithPartyName
          key={i}  
          candidate={{...c, avatar: '', age: String(c.age) }} />
      ))}
    </>
  )
}

export const PartiesSearchResults = ({ parties }: {
  parties: SingleParty[]
}) => {
  return (
    <>
      {parties.length > 0 && (
        <DecoratedTitle 
          title={'黨團'} />
      )}
      {parties.map((party, i) => (
        <ResultItemCardWrapper>
          <PartyCard 
            key={i}
            {...party} />
        </ResultItemCardWrapper>
      ))}  
    </>
  )
}

const SearchResults = (props: Props) => {
  const { loading, error, data } = props
  if(loading || error) {
    return <LoadingAndError {...props} />
  }
  else if(data) {
    const {
      constituecyCandidates,
      partyCandidates,
      parties
    } = data
    const isNoResult = constituecyCandidates.length === 0 && partyCandidates.length === 0 && parties.length === 0

    if(isNoResult) {
      return (
        <Typography>{'查無結果'}</Typography>
      )
    }
    return (
      <Box>
        <ConstituecyCandidatesSearchResults {...data} />
        <PartyCandidatesSearchResults {...data} />
        <PartiesSearchResults {...data}  />
      </Box>
    )
  }
  return null
}

export default SearchResults