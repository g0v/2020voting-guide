import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import React, { ReactNode } from 'react';

interface VideoCard {
    title: string;
    subtitle: string;
    src: string;
    children: ReactNode;
}

const useStyles = makeStyles({
    mainButton: {
        height: '35vw',
        width: '41vw'
    }
});

const VideoCard = ({ title, subtitle, src, children }: VideoCard) => (
    <Box my={4}>
        <Box mx={1}>
            <Typography variant="h2">{title}</Typography>
            <Typography variant="subtitle2">{subtitle}</Typography>
        </Box>
        <iframe title={title} src={src} frameBorder="0" width="100%"></iframe>
        <Box mx={1}>
            <Typography variant="body2">{children}</Typography>
        </Box>
    </Box>
);

const Home = () => {
    const classes = useStyles();

    return (
        <div>
            <Box m={1} height="100vh">
                <Box my={6}>
                    <Typography variant="h1" align="center">
                        2020<br />
                        投票指南
                    </Typography>
                </Box>
                <Typography variant="h3" align="center">
                    不再看臉投票<br />
                    檢視實際作為<br />
                    投下真正幫助社會的一票 
                </Typography>
                <Box mt={5}>
                    <Typography variant="h5" align="center">
                        整合政府開放資料，比較政黨、候選人表現
                    </Typography>
                </Box>
                <Box
                    mt={2}
                    mb={6}
                    mx={2}
                    display="flex"
                    justifyContent="space-between"
                >
                    <Button
                        color="primary"
                        variant="contained"
                        href="/county"
                        fullWidth
                        className={classes.mainButton}
                    >
                        <Box textAlign="center">
                            <img src="/img/nobody.svg" />
                            <Typography variant="h6">
                                <b>比較候選人</b>
                            </Typography>
                            <Typography variant="button">區域立委</Typography>
                        </Box>
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        href="/county"
                        fullWidth
                        className={classes.mainButton}
                    >
                        <Box textAlign="center">
                            <img src="/img/party.svg" />
                            <Typography variant="h6">
                                <b>比較參選政黨</b>
                            </Typography>
                            <Typography variant="button">不分區立委</Typography>
                        </Box>
                    </Button>
                </Box>
                <Box m={1}>
                    <Typography variant="h4">
                        本站資料來源：
                    </Typography>
                    <img src="/img/logo/central_election_commision.png" />
                    <img src="/img/logo/citizen_congress_watch.png" />
                    <img src="/img/logo/control_yuan.png" />
                    <img src="/img/logo/logo_legislation.png" />
                    <img src="/img/logo/wikipedia.png" />
                </Box>
            </Box>
            {/* <Box id="legislator_intro" height="60px"></Box> */}
            <VideoCard
                title="立委工作說明"
                subtitle="The News Lens 關鍵評論網 - 立委的一天在幹嘛?"
                src="https://www.youtube.com/embed/lOCqaZ5Pb_w"
            >
                立法委員的究竟該做什麼？
                <br />
                憲法第63條則載明「立法院有議決法律案、預算案、戒嚴案、大赦案、宣戰案、媾和案、條約案及國家其他重要事項之權。」而根據「立法院職權行使法」對立法委員之職責，亦有更明確與具體的描述。
                <br />
                「什麼樣的選民，就會有什麼樣的立委！」國會助理說得直接。
                <br />
                換言之，身為選民該思考的是，我們究竟想要一個什麼樣的立法委員？如果憲法上是如此明定立委的職權，透過訪談，我們發現納稅人每年花了近千萬養一個立法委員，而他們每天24小時願意、不願意做的那些事，真的是我們期望的嗎？
            </VideoCard>
            <VideoCard
                title="立委立委選舉投票規則工作說明"
                subtitle="The News Lens 關鍵評論網 - 什麼是政黨票?"
                src="https://www.youtube.com/embed/zPkX6cn4oMg"
            >
                單一選區兩票制
                <br />
                一般來說呢，選舉體制分成三大類：多數決、比例代表制，以及混合制。「多數決」就是指票數最多的當選，「比例代表制」則是按選票比例轉換成席位（主要是選黨不選人）。
                <br />
                咱們台灣在2008年後的新選制是採用「單一選區 /
                兩票制」，也就是混合了多數決和比例代表制：每個人有兩張票，一票投「區域立委」，這票是投給人；第二張票則是投給政黨（政黨票），以選出「不分區立委」。
                <br />
                其中單一選區（小選區）下選出的區域立委共有73席，以政黨票決定的不分區立委則有34席。但立委總共有113席（73+34+6），另外6席是複數制選區的原住民立委（平地及山地原住民各3席）
            </VideoCard>
        </div>
    );
};
export default Home;
