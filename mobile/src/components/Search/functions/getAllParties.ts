import parties from '../../../data/party.json';

const getAllParties = () => {
  return parties
}
export type SingleParty = ReturnType<typeof getAllParties>[0]

export default getAllParties