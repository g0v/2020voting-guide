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
    const year = parseInt(billNo.substr(0, 3)) + 1911;
    const month = billNo.substr(3, 2);
    const day = billNo.substr(5, 2);

    return `${year}-${month}-${day}`;
};

/**
 * 就是 pipe
 * @param initialValue {any}
 * @param fns {Function[]}
 * @returns {any}
 */
export const pipe = (initialValue: any, ...fns: Function[]) => {
    return fns.reduce(
        (prev, currentFun: Function) => currentFun(prev),
        initialValue
    );
};

/**
 * 數字千分位逗號處理
 * @param value {string|number}
 * @returns {string}
 */
export const numberWithCommas = (value: number | string): string => {
    if (!value) {
        return '--';
    }
    const parts: string[] = value.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
};

/**
 * gtag event
 * @param category
 * @param action
 * @param label
 */
export const gaEvent = (category: string, action: string, label: string) => {
    (window as any)['gtag']('event', action, {
        event_category: category,
        event_label: label
    });
    if (process.env.NODE_ENV === 'development') {
        console.log('gaEvent', category, action, label);
    }
};

export const registerGAEvent = () => {
    window.addEventListener('click', (e: MouseEvent) => {
        const dom: HTMLElement = e.target as HTMLElement;
        const category: string = dom.getAttribute('data-category') || '';
        const action: string = dom.getAttribute('data-action') || '';
        const label: string = dom.getAttribute('data-label') || '';
        if (category && action && label) {
            gaEvent(category, action, label);
        }
    });
};
