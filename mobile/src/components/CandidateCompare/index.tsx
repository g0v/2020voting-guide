import React from 'react';
import { Link, Box, Card } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import CandidateCompareCardHeader from './CandidateCompareCardHeader';
import CandidateCompareCardFB from './CandidateCompareCardFB';
import CandidateCompareCardFBAd from './CandidateCompareCardFBAd';
import CandidateCompareCardIssueBill from './CandidateCompareCardIssueBill';
import CandidateCompareCardEducation from './CandidateCompareCardEducation';
import CandidateCompareCardPolitical from './CandidateCompareCardPolitical';
import CandidateCompareCardHeaderFixed from './CandidateCompareCardHeaderFixed';
import clsx from 'clsx';
import './CandidateCompare.scss';

declare let window: any;

interface Route {
    match: {
        params: {
            constituency: string;
            names: string;
        };
    };
}

/**
 * 不分區候選人比較
 */
const CandidateCompare = ({ match }: Route) => {
    const { constituency, names } = match.params;
    const [candidateNames, setCandidateNames] = React.useState<string[]>(
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
    }, [candidateNames]);

    const onCandidateDelete = React.useCallback((name: string) => {
        setCandidateNames((prev: string[]) => {
            const indexOf: number = prev.indexOf(name);
            prev.splice(indexOf, 1);
            return [...prev];
        });
    }, []);
    return (
        <div className="page-candidate-compare">
            <Box m={1} className="page-candidate-compare-nav">
                <Box display="flex" alignItems="center" my={1}>
                    <Link
                        href={`/regional/台北市/${constituency}?select=${names}`}
                    >
                        <KeyboardArrowLeft fontSize="large" />
                    </Link>
                    <Box>
                        <Typography variant="h3" display="inline">
                            比較立委
                        </Typography>
                        <Typography
                            variant="h5"
                            display="inline"
                            color="textSecondary"
                            className="ml-3"
                        >
                            {constituency}
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
                            {candidateNames.map((name: string) => {
                                return (
                                    <CandidateCompareCardHeaderFixed
                                        key={name}
                                        currentCandidateCount={
                                            candidateNames.length
                                        }
                                        constituency={constituency}
                                        onDelete={onCandidateDelete}
                                        name={name}
                                    />
                                );
                            })}
                            <div className="candidate-compare-card">
                                <a
                                    className="btn btn-rounded candidate-compare-add-btn"
                                    href={`/regional/台北市/${constituency}?select=${names}`}
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
                        {candidateNames.map((name: string) => {
                            const baseProp = {
                                name,
                                constituency
                            };
                            return (
                                <div
                                    className="candidate-compare-card"
                                    key={name}
                                >
                                    <Card>
                                        <Box px={2} py={2}>
                                            <CandidateCompareCardHeader
                                                {...baseProp}
                                                currentCandidateCount={
                                                    candidateNames.length
                                                }
                                                onDelete={onCandidateDelete}
                                            />
                                            <div className="divider style-gray my-3"></div>
                                            <CandidateCompareCardIssueBill
                                                {...baseProp}
                                            />
                                            <div className="divider style-gray my-3"></div>
                                            <CandidateCompareCardFB
                                                {...baseProp}
                                            />
                                            <CandidateCompareCardFBAd
                                                {...baseProp}
                                            />
                                            <div className="divider style-gray my-3"></div>
                                            <CandidateCompareCardEducation
                                                {...baseProp}
                                            />
                                            <div className="divider style-gray my-3"></div>
                                            <CandidateCompareCardPolitical
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
                                href={`/regional/台北市/${constituency}?select=${names}`}
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
export default CandidateCompare;
