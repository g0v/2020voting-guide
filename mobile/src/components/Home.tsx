import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link, LinkProps } from 'react-router-dom';

const AdapterLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
    (props, ref) => <Link innerRef={ref} {...props} />
);

interface VideoCard {
    title: string;
    subtitle: string;
    src: string;
    content: string;
}

const VideoCard = ({ title, subtitle, src, content }: VideoCard) => (
    <Box my={4}>
        <Box mx={1}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="subtitle2">{subtitle}</Typography>
        </Box>
        <iframe title={title} src={src} frameBorder="0" width="100%"></iframe>
        <Box mx={1}>
            <Typography variant="body2">{content}</Typography>
        </Box>
    </Box>
);

const Home = () => (
    <div>
        <Box m={1} height="100vh">
            <Typography variant="h6">2020 投票指南</Typography>
            <Typography variant="body2">
                減少盲目支持，從更多的理解和認識，選擇你真正認同的候選人。
                <br />
                整合政府開放資料，提供民眾對照，快速比較出你支持的政黨、候選人。
            </Typography>
            <Box display="flex" justifyContent="center">
                <Button color="primary" variant="contained">
                    <Typography variant="button">比較政黨</Typography>
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    component={AdapterLink}
                    to="/county"
                >
                    <Typography variant="button">比較區域立委</Typography>
                </Button>
            </Box>
        </Box>
        <VideoCard
            title="立委工作說明"
            subtitle="The News Lens 關鍵評論網 - 立委的一天在幹嘛?"
            src="https://www.youtube.com/embed/lOCqaZ5Pb_w"
            content="身為不分區立委的助理A解釋道，「一般來說，在會期裡一週的一三四是委員會；二五則是院會。其中一三四的委員會，早上會是最緊繃的，有關質詢重點、議題都得會花很多時間找資料、準備，或是配合黨團開記者會等。而二五院會，從早上到下午2～3點之前都在立法院，結束後才會回地方跑選區。」
                    「在會期中，委員2/3的時間、精神、功夫都在立法院，也非常注重問政品質、和自己上台質詢的表現。」但是真的每個立委都是這樣嗎？"
        />
        <VideoCard
            title="立委立委選舉投票規則工作說明"
            subtitle="The News Lens 關鍵評論網 - 什麼是政黨票?"
            src="https://www.youtube.com/embed/zPkX6cn4oMg"
            content="身為不分區立委的助理A解釋道，「一般來說，在會期裡一週的一三四是委員會；二五則是院會。其中一三四的委員會，早上會是最緊繃的，有關質詢重點、議題都得會花很多時間找資料、準備，或是配合黨團開記者會等。而二五院會，從早上到下午2～3點之前都在立法院，結束後才會回地方跑選區。」
            「在會期中，委員2/3的時間、精神、功夫都在立法院，也非常注重問政品質、和自己上台質詢的表現。」但是真的每個立委都是這樣嗎？"
        />
    </div>
);

export default Home;
