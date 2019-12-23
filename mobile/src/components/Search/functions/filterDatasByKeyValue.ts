
function filterDatasByKeyValue<Data extends {
  [key: string]: any
}, Key extends keyof Data>(data: Data[]) {
  return (key: keyof Data) => (value: Data[Key]) => {
   if(!value) {
    return []
   } else {
    return data.filter(d => d[key].includes(value))
   }
  }
}

export default filterDatasByKeyValue