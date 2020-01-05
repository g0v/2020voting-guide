import React from 'react';
import { Link, Box, Card } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import PartiesCompareCardHeader from './PartiesCompareCardHeader';
import PartiesCompareCandidates from './PartiesCompareCandidates';
import PartiesCompareCardHeaderFixed from './PartiesCompareCardHeaderFixed';
import PartiesCompareBills from './PartiesCompareBills';
import PartiesComparePolitics from './PartiesComparePolitics';
import clsx from 'clsx';
import '../CandidateCompare/CandidateCompare.scss';
import './PartiesCompare.scss';

declare let window: any;

interface Route {
    match: {
        params: {
            constituency: string;
            names: string;
            county: string;
        };
    };
}

/**
 * 比較政黨
 */
const PartiesCompare = ({ match }: Route) => {
    const { names } = match.params;
    const [partyNames, setPartyNames] = React.useState<string[]>(
        names.split(',')
    );
    const [visible, setVisible] = React.useState<boolean>(false);
    const swiperContainer = React.useRef<HTMLDivElement>(null);
    const swiperRef = React.useRef<any>(null);
    React.useEffect(() => {
        document.body.classList.add('body-page-candidate-compare');
        let isTransitionStart = false;
        const swiperWrapper = document.getElementById(
            'swiper-wrapper'
        ) as HTMLDivElement;
        const swiperWrapperFixed = document.getElementById(
            'swiper-wrapper-fixed'
        ) as HTMLDivElement;
        const updateSwiper = () => {
            swiperWrapperFixed.style.transform = swiperWrapper.style.transform;
            swiperWrapperFixed.style.transitionDuration =
                swiperWrapper.style.transitionDuration;
        };
        const swiper = new window.Swiper(swiperContainer.current, {
            slidesPerView: 'auto',
            freeMode: true,
            scrollbarHide: false,
            // mousewheel: true,
            scrollbar: {
                el: '.swiper-scrollbar',
                draggable: true
            },
            on: {
                transitionStart() {
                    isTransitionStart = true;
                },
                transitionEnd() {
                    isTransitionStart = false;
                },
                progress() {
                    updateSwiper();
                }
            }
        });

        swiperRef.current = swiper;

        const tickHandler = () => {
            if (!isTransitionStart) {
                return;
            }
            updateSwiper();
        };

        window.TweenMax.ticker.addEventListener('tick', tickHandler);
        const scrollHandler = () => {
            setVisible(() => {
                if (window.pageYOffset > 182) {
                    return true;
                }
                return false;
            });
        };

        window.addEventListener('scroll', scrollHandler);
        return () => {
            document.body.classList.remove('body-page-candidate-compare');
            swiper.destroy();
            window.TweenMax.ticker.removeEventListener('tick', tickHandler);
            window.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    React.useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.update();
        }
    }, [partyNames]);

    const onCandidateDelete = React.useCallback((name: string) => {
        setPartyNames((prev: string[]) => {
            const indexOf: number = prev.indexOf(name);
            prev.splice(indexOf, 1);
            return [...prev];
        });
    }, []);
    return (
        <div className="page-candidate-compare page-parties-compare">
            <Box m={1} className="page-candidate-compare-nav">
                <Box display="flex" alignItems="center" my={1}>
                    <Link href={`/parties?select=${names}`}>
                        <KeyboardArrowLeft fontSize="large" />
                    </Link>
                    <Box>
                        <Typography variant="h3" display="inline">
                            比較政黨
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <div
                className={clsx('canidate-compare-fixed-container', {
                    'is-show': visible
                })}
            >
                <div className="swiper-container swiper-container-free-mode">
                    <div className="swiper-wrapper" id="swiper-wrapper-fixed">
                        <div className="candidate-compare-row">
                            {partyNames.map((name: string) => {
                                return (
                                    <PartiesCompareCardHeaderFixed
                                        key={name}
                                        currentCandidateCount={
                                            partyNames.length
                                        }
                                        onDelete={onCandidateDelete}
                                        name={name}
                                    />
                                );
                            })}
                            <div className="candidate-compare-card">
                                <a
                                    className="btn btn-rounded candidate-compare-add-btn"
                                    href={`/parties?select=${names}`}
                                >
                                    +
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="swiper-container" ref={swiperContainer}>
                <div className="swiper-wrapper" id="swiper-wrapper">
                    <div className="swiper-scrollbar"></div>
                    <div className="swiper-slide candidate-compare-row">
                        {partyNames.map((name: string) => {
                            const baseProp = {
                                name
                            };
                            return (
                                <div
                                    className="candidate-compare-card"
                                    key={name}
                                >
                                    <Card>
                                        <Box px={2} py={2}>
                                            <PartiesCompareCardHeader
                                                {...baseProp}
                                                currentCandidateCount={
                                                    partyNames.length
                                                }
                                                onDelete={onCandidateDelete}
                                            />
                                            <div className="divider style-gray my-3"></div>
                                            <PartiesCompareCandidates
                                                {...baseProp}
                                            />
                                            <div className="divider style-gray my-3"></div>
                                            <PartiesCompareBills
                                                {...baseProp}
                                            />
                                            <div className="divider style-gray my-3"></div>
                                            <PartiesComparePolitics
                                                {...baseProp}
                                            />
                                        </Box>
                                    </Card>
                                </div>
                                // candidate-compare-card end
                            );
                        })}
                        <div className="candidate-compare-card">
                            <a
                                className="btn btn-rounded candidate-compare-add-btn"
                                href={`/parties?select=${names}`}
                            >
                                +
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // page-candidate-compare end
    );
};
export default PartiesCompare;
