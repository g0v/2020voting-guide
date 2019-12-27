import { useState } from "react"

export const useOpenClose = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return ({
    open, handleOpen, handleClose
  })
}