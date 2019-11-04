// cdn js
declare let TweenMax: any;
declare let Power2: any;

export const simplifyCaseOfAction = (caseOfAction: string) => {
    return caseOfAction.replace(/^.+?，/, '').replace(/[，。]?爰(.+)$/, '。');
};

export const scrollBody = (dom: string, duration = 0.5, gap = 10) => {
    const { clientHeight: headerHeight } = document.querySelector(
        'header'
    ) as HTMLDivElement;

    const targetDOM: HTMLDivElement = document.querySelector(
        dom
    ) as HTMLDivElement;
    const { top: targetRectTop } = targetDOM.getBoundingClientRect();
    const scrollToY: number =
        window.scrollY + targetRectTop - gap - headerHeight;
    return TweenMax.to(window, duration, {
        scrollTo: {
            y: scrollToY,
            autoKill: false
        },
        ease: Power2.easeOut
    });
};

export const billNoToDate = (billNo: string) => {
    const year = parseInt(billNo.substr(0, 3)) + 1911
    const month = billNo.substr(3, 2)
    const day = billNo.substr(5, 2)
    
    return `${year}-${month}-${day}`
}
