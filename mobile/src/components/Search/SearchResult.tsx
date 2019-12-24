import React, { useEffect } from 'react'
import { Box, Typography } from '@material-ui/core'
import { AllCandidatesAndParties } from './functions/getAllCandidatesAndParties'
import Loading from './Loading'
import PartyCard from '../PartyCandidates/PartyCard'
import SingleCandidateItem from '../Party/SingleCandidateItem'
import { CandidateCard } from '../ConstituencyCandidates/CandidateCard'
import filterDatasByKeyValue from './functions/filterDatasByKeyValue'

type Props = {
  loading: boolean,
  error: any
  data: AllCandidatesAndParties | undefined,
  inputValue: string 
}

export const handleNullValueToString = (val: string | null) => (
  typeof val === 'string' ? val : ''
) 

const SearchResults = ({
  loading,
  error,
  data,
  inputValue,
}: Props) => {
  if(loading) return (
    <Loading />
  )
  if(error) return (
    <Typography>
      {error}
    </Typography>
  )

  if(data) {
    return (
      <Box>
        {data.constituecyCandidates.map((c, i) => (
          <CandidateCard 
            key={i}
            id={String(i)} 
            {...c}
            experience={handleNullValueToString(c.experience)} />
        ))}
        {data.partyCandidates.map((c, i) => (
          <SingleCandidateItem
            key={i}  
            candidate={{
                ...c,
                avatar: '',
                age: String(c.age)
              }} />
        ))}
        <hr />
        {data.parties.map((party, i) => (
          <PartyCard 
            key={i}
            {...party} />
        ))}
      </Box>
    )
  }
  return null
}

export default SearchResults