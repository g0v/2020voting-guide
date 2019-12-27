import React from 'react'
import { Box, Dialog, DialogContent, makeStyles } from '@material-ui/core'
import SearchContainer from './SearchContainer'
import { MODAL_MAX_WIDTH } from '../../config'
import { Callback } from './types'

type SearchContainerWithDialogProps = {
  open: boolean
  onClose?: Callback
}

const SearchContainerWithDialog = ({
  open, onClose
}: SearchContainerWithDialogProps) => {
  return (
    <Dialog open={open} fullWidth maxWidth={'lg'} onClose={onClose}>
      <DialogContent>
        <SearchContainer />
      </DialogContent>
    </Dialog>
  )
}

export default SearchContainerWithDialog