export const getSplitValueJoinByOr = (value: string) =>
    value.split('').join('|');

export const getValueRegExp = (value: string) => {
    const joinedVal = getSplitValueJoinByOr(value);
    return new RegExp(joinedVal, 'g');
};

function checkValuesMatched(regValue: string, shouldMatchValue: string) {
    const regValueLength = regValue.length;
    const regExp = getValueRegExp(regValue);
    const matchResult = shouldMatchValue.match(regExp);
    const isAllMatchedByRegValue =
        matchResult && matchResult.length >= regValueLength;
    return isAllMatchedByRegValue;
}

export default checkValuesMatched;
