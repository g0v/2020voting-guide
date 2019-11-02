export const simplifyCaseOfAction = (caseOfAction: string) => {
    return caseOfAction.replace(/^.+?，/, '').replace(/[，。]?爰(.+)$/, '。');
};

export const billNoToDate = (billNo: string) => {
    const year = parseInt(billNo.substr(0, 3)) + 1911
    const month = billNo.substr(3, 2)
    const day = billNo.substr(5, 2)
    
    return `${year}-${month}-${day}`
}