import React, { useEffect, useState, useCallback } from 'react'
import { Box, makeStyles, Theme, createStyles } from '@material-ui/core'
import SearchInput from './SearchInput'
import getAllCandidatesAndParties, { AllCandidatesAndParties } from './functions/getAllCandidatesAndParties'
import SearchResults from './SearchResult'
import useFetchData from './functions/useFetchData'
import { useChangeInput } from './functions/useChangeInput'
import filterSearchResults from './functions/filterSearchResults'

const useStyles = makeStyles((theme: Theme) => (
  createStyles({
    root: {
      padding: theme.spacing(2)
    }
  })
))

const SearchContainer = () => {
  const classes = useStyles()
  const {
    searchInput,
    changeInput,
  } = useChangeInput('')
  const {
    fetchResult,
    queryData,
  } = useFetchData(getAllCandidatesAndParties)

  const handleSearch = useCallback(() => {
    const filterFn = filterSearchResults(searchInput)
    queryData(filterFn)
  }, [searchInput])

  return (
    <Box className={classes.root}>
      <SearchInput
        searchInput={searchInput}
        changeInput={changeInput}
        searchFn={handleSearch} />
      <SearchResults 
        {...fetchResult}
        inputValue={searchInput} />
    </Box>
  )
}

export default SearchContainer