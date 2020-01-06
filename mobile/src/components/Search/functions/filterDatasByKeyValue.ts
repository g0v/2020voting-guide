import checkValuesMatched from './checkValuesMatched';

// const checkIsMatch = (compareVal: string, comparedVal: string) =>
//     comparedVal.includes(compareVal);

function filterDatasByKeyValue<Key extends string>(key: Key) {
    return (value: string) => <
        Data extends {
            [key in Key]: typeof value;
        }
    >(
        data: Data[]
    ) => (value ? data.filter(d => checkValuesMatched(value, d[key])) : []);
}

export default filterDatasByKeyValue;
