import { AdCardProp } from './AdCard';

export const caculateCurrencySum = (ads: AdCardProp[]) => {
    if (!ads.length) return { sumLower: 0, sumUpper: 0 };
    const adDetails = ads.map(ad => ad['廣告詳情']);
    if (adDetails.filter(ad => !['USD', 'TWD'].includes(ad.currency)).length)
        return { sumLower: 0, sumUpper: 0 };

    const twdAds = adDetails.map(ad => {
        if (ad.currency === 'USD') {
            return {
                ...ad,
                currency: 'TWD',
                spend: {
                    lower_bound: (
                        parseInt(ad.spend.lower_bound) * 30
                    ).toString(),
                    upper_bound: (
                        parseInt(ad.spend.upper_bound) * 30
                    ).toString()
                }
            };
        } else {
            return ad;
        }
    });

    const sumLower = twdAds.reduce((total, ad) => {
        if (!ad) return 0;
        const adPrice = parseInt(ad.spend.lower_bound);
        return total + adPrice;
    }, 0);
    const sumUpper = twdAds.reduce((total, ad) => {
        if (!ad) return 0;
        const adPrice = parseInt(ad.spend.upper_bound);
        return total + adPrice;
    }, 0);

    return { sumLower, sumUpper };
};

export const caculateImpressionsSum = (ads: AdCardProp[]) => {
    if (!ads.length) return { sumLower: 0, sumUpper: 0 };
    const adDetails = ads.map(ad => ad['廣告詳情']);

    const sumLower = adDetails.reduce((total, ad) => {
        if (!ad) return 0;
        const impressions = parseInt(ad.impressions.lower_bound);
        return total + impressions;
    }, 0);
    const sumUpper = adDetails.reduce((total, ad) => {
        if (!ad) return 0;
        const impressions = parseInt(ad.impressions.upper_bound);
        return total + impressions;
    }, 0);

    return { sumLower, sumUpper };
};
