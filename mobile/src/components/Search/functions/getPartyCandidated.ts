import partiesCandidates from '../../../data/party_candidates.json';

export type SingleCandidataInParty = {
  party: string
  rank: number
  name: string
  isCurrent: boolean
  isPast: boolean
  birth: string
  age: number | string
  photo: string
  wiki: string
  fb: string
  education: string
  educationLink: string
  experience: string
  experienceLink: string
  politics: string
  politicsLink: string
  others: string
  unvarifiedEducation: string
  unvarifiedPolitics: string
}

type PartiesCandidate = {
  [x in keyof typeof partiesCandidates]: SingleCandidataInParty[]
}

const getPartyCandidates = (): PartiesCandidate  => {
  return {
    ...partiesCandidates
  }
}

const getAllPartyCandidates = () => {
  const partiesCandidates = getPartyCandidates()
  let allCandidates: SingleCandidataInParty[] = []

  const parties = Object.keys(partiesCandidates) as (keyof PartiesCandidate)[]
  for (const party of parties) {
    allCandidates = [
      ...allCandidates,
      ...partiesCandidates[party]
    ]
  }
  return allCandidates
}

export default getAllPartyCandidates