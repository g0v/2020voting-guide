export type CalNewIndexParam = {
  indexNow: number
  lastIndex: number
}
export type Operation = '+' | '-'
type CalNewIndex = (op: Operation) => (indexes: CalNewIndexParam) => number

export const calNewIndex: CalNewIndex = (operation) => (indexes) => {
  const {
    indexNow,
    lastIndex,
  } = indexes;
  if(operation === '+') {
    return indexNow + 1 > lastIndex ? 
      0 : indexNow + 1;
  } else {
    return indexNow - 1 < 0 ? 
      lastIndex : indexNow - 1;
  }
};