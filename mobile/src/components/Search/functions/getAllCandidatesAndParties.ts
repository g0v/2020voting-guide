import getAllParties from "./getAllParties"
import getAllPartyCandidates, { SingleCandidateInParty } from "./getPartyCandidated"
import getAllConstituencyCandidates, { SingleConstituencyCandidate } from "./getAllConstituencyCandidates"

export type AllCandidatesAndParties = {
  parties: ReturnType<typeof getAllParties>,
  partyCandidates: SingleCandidateInParty[],
  constituecyCandidates: SingleConstituencyCandidate[]
}

const getAllCandidatesAndParties = async () => {
  const parties = getAllParties()
  const partyCandidates = getAllPartyCandidates()
  const constituecyCandidates = await getAllConstituencyCandidates()
  return ({
    parties,
    partyCandidates,
    constituecyCandidates
  })
}

export default getAllCandidatesAndParties