import { API_CONSTITUENCY, API_ALL_REGIONAL_CANDIDATES } from '../../../config'
import countyConstituecies from '../../../data/county_constituency.json'

export type SingleConstituencyCandidate = {
  "county": string,
  "constituency": string,
  "name": string,
  "photo": string | null,
  "party": string,
  "experience": string | null,
  "currentLegislator": boolean
}

const getAllCountyConstituencies = (): string[] => {
  let allAreas: string[] = []
  countyConstituecies.forEach(c => {
    allAreas = [
      ...allAreas,
      ...c.area
    ]
  })
  return allAreas
}

const getAllConstituencyCandidates = () => {
  // let allConstituencyCandidates: SingleConstituencyCandidate[] = []
  return fetch(API_ALL_REGIONAL_CANDIDATES)
    .then(res => res.json())
    .then((res: SingleConstituencyCandidate[]) => {
      return res
    })
}

export default getAllConstituencyCandidates