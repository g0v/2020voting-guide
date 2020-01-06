import checkValuesMatched, {
    getSplitValueJoinByOr,
    getValueRegExp
} from './checkValuesMatched';

describe('test checkValuesMatched', () => {
    it('test getSplitValueJoinByOr', () => {
        const EXPECT = 'a|b|c';
        const mock = 'abc';
        expect(getSplitValueJoinByOr(mock)).toEqual(EXPECT);
    });

    it('test getValueRegExp', () => {
        const EXPECT = /a|b|c/g;
        const mock = 'abc';
        expect(getValueRegExp(mock)).toEqual(EXPECT);
    });

    it('test checkValuesMatched', () => {
        const regValue = 'ace';
        const regValue02 = 'abb';
        const shouldMatchValue = 'abcde';
        expect(checkValuesMatched(regValue, shouldMatchValue)).toBeTruthy();
        expect(checkValuesMatched(regValue02, shouldMatchValue)).toBeFalsy();
    });
});
