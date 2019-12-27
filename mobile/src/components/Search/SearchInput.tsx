import React, { useState, useCallback, ChangeEvent } from 'react'
import { TextField, Button, makeStyles, Box } from '@material-ui/core'
import { SearchRounded } from '@material-ui/icons'

const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
  input: {
    width: '100%',
  },
  searchButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    margin: 'auto',
  }
})

type Props = {
  searchInput: string,
  changeInput: (e: ChangeEvent<HTMLInputElement>) => any,
  searchFn: (x?: any) => any
}

const SearchInput = ({
  searchInput, changeInput, searchFn
}: Props) => {
  const classes = useStyles()
  return (
    <Box 
      className={classes.root}
    >
      <TextField
        name={'search'}
        className={classes.input}
        variant={'outlined'}
        placeholder={'搜尋立委/政黨'}
        value={searchInput}
        onChange={changeInput} />
      <Button 
        className={classes.searchButton}
        onClick={searchFn}
      >
        <SearchRounded />
      </Button>
    </Box>
  )
}

export default SearchInput