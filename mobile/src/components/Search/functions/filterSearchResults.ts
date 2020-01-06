import { AllCandidatesAndParties } from './getAllCandidatesAndParties';
import filterDatasByKeyValue from './filterDatasByKeyValue';

const filterSearchResults = (inputValue: string) => (
    data: AllCandidatesAndParties
): AllCandidatesAndParties => {
    const filterFn = filterDatasByKeyValue('name')(inputValue);
    return {
        parties: filterFn(data.parties),
        partyCandidates: filterFn(data.partyCandidates),
        constituecyCandidates: filterFn(data.constituecyCandidates)
    };
};

export default filterSearchResults;
