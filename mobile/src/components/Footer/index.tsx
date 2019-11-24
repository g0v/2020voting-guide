import './Footer.scss';
import { Box, Container, Typography, Link, Tooltip } from '@material-ui/core';
import React from 'react';

const Footer = () => {
    return (
        <footer className="footer typography">
            <Container maxWidth="md">
                <div className="footer__content">
                    <div className="footer__block footer__block--1">
                        <Box my={5}>
                            <div className="footer__kv"></div>
                        </Box>
                        <Box my={5}>
                            <Typography
                                variant="h3"
                                className="footer__floowus"
                            >
                                <span>FOLLOW US →</span>
                                <a
                                    href="https://www.facebook.com/voting.guide.tw/"
                                    target="_blank"
                                >
                                    <span className="footer__ic-fb"></span>
                                </a>
                            </Typography>
                        </Box>
                        <Box my={5} className="footer__block-about">
                            {/* TODO：待頁面上線後，拿掉 Tooltip */}
                            <Tooltip title="COMING SOON" placement="left">
                                <Link>
                                    <Typography variant="h3">
                                        關於我們
                                    </Typography>
                                </Link>
                            </Tooltip>
                            <Link
                                target="_blank"
                                href="https://docs.google.com/forms/d/e/1FAIpQLSfc_MGy-ImXbukLWk-YsA3a96ZDf9etHF0TmSLPHPniTxaMxw/viewform"
                            >
                                <Typography variant="h3">問題回報</Typography>
                            </Link>
                        </Box>
                    </div>
                    <div className="footer__block footer__block--2">
                        <Box my={3}>
                            {/* TODO：待頁面上線後，拿掉 Tooltip */}
                            <Tooltip title="COMING SOON" placement="left">
                                <Link>
                                    <Typography variant="h4">
                                        立委工作內容 ＆ 投票規則
                                    </Typography>
                                </Link>
                            </Tooltip>
                        </Box>
                        <Box my={3}>
                            <Link href="/regional">
                                <Typography variant="h4">
                                    區域立委候選人
                                </Typography>
                            </Link>
                        </Box>
                        <Box my={3}>
                            <Link href="/progressing">
                                <Typography variant="h4">
                                    不分區立委參選政黨
                                </Typography>
                            </Link>
                        </Box>

                        <Box my={3}>
                            {/* TODO：待頁面上線後，拿掉 Tooltip */}
                            <Tooltip title="COMING SOON" placement="left">
                                <Link>
                                    <Typography variant="h4">
                                        熱門議題
                                    </Typography>
                                </Link>
                            </Tooltip>
                        </Box>
                    </div>
                </div>
                <Typography variant="h4" className="footer__powered">
                    Powered by g0v 選前大補貼團隊
                </Typography>
            </Container>
        </footer>
    );
};
export default Footer;
