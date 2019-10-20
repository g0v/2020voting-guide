export const simplifyCaseOfAction = (caseOfAction: string) => {
    return caseOfAction.replace(/^.+?，/, '').replace(/[，。]?爰(.+)$/, '。');
};
