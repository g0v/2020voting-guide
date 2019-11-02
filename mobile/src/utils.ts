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
