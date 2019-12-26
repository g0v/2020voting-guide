import { AllCandidatesAndParties } from "./getAllCandidatesAndParties"
import filterDatasByKeyValue from "./filterDatasByKeyValue"

const filterSearchResults = (inputValue: string) => (data: AllCandidatesAndParties): AllCandidatesAndParties => {
  return {
    parties: filterDatasByKeyValue(data.parties)('name')(inputValue),
    partyCandidates: filterDatasByKeyValue(data.partyCandidates)('name')(inputValue),
    constituecyCandidates: filterDatasByKeyValue(data.constituecyCandidates)('name')(inputValue),
  }
}

export default filterSearchResults