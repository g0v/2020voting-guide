import { useState, ChangeEvent } from "react"

export const useChangeInput = (initInput='') => {
  const [searchInput, setSearchInput] = useState(initInput)
  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }
  return ({
    searchInput,
    changeInput,
  })
}