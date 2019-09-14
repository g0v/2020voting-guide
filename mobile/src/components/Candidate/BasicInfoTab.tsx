import React from 'react';
import { makeStyles } from '@material-ui/styles';

const experiences = [
    '台北馬偕醫院及萬芳醫院精神科主治醫師',
    '柯文哲市長競選團隊發言人',
    '台灣部落格協會理事長（BillyPan，比利潘）',
    '台北醫學大學臨床講師',
    '民報副總主筆',
    '電視評論員，廣播主持人',
    '北門扶輪社社員'
];

const politics = [
    '醫師立委，監督健保：以專業醫師23年經驗，監督全民健保，減少浪費，嚴查貪瀆，杜絕剝削基層醫護。',
    '醫師立委，推動長期照護：以老人醫學實務心得，加速規劃長照保險，優先照顧弱勢家庭。',
    '醫師立委，確保食安：制定『食品安全現代化法』，設立專業食安警察，事權統一於衛福部，追蹤溯源，控管海關，追緝食品造假。',
    '資深網路部落客，掃除青年創業法律障礙：政府法規要跟上科技發展，政府資訊應利用網路更公開透明。經濟的發展來自於創新，而創新的動能來自於青年。',
    '以中央公園降低空氣污染：推動『松山機場遷建設立中央公園條例』，解除中山區松山區限高限建問題，成為台灣『曼哈頓』，種百萬棵樹改善全台北空氣PM2.5污染。',
    '以公辦幼托解決低生育率：因應台灣少子化重大危機，12年國教應往下延伸，私立幼稚園和公立學費差額由政府補足，有效鼓勵生育。',
    '修法落實居住正義：推動住宅法修正，明定中央無償提供國有地，供地方興建只租不售的社會住宅。解決柯文哲、蔡英文5 - 20萬戶社會住宅政見無地可用之困擾。',
    '白色力量，守護健康。白色力量，翻轉國會。白色力量，智造未來。'
];

const useStyle = makeStyles({
    overview: {
        padding: 20
    },
    photo: {
        width: 131,
        height: 131,
        padding: 10,
        borderRadius: '50%',
        verticalAlign: 'middle'
    },
    overviewText: {
        display: 'inline-block',
        verticalAlign: 'middle'
    }
});

const BasicInfoTab = () => {
    const classes = useStyle();
    return (
        <>
            <div className={classes.overview}>
                <div>
                    <div>經歷</div>
                    {experiences.map(exp => (
                        <div>{exp}</div>
                    ))}
                </div>
                <hr />
                <div>
                    <div>政見</div>
                    {politics.map((politic, i) => (
                        <div>
                            {i + 1}.{politic}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default BasicInfoTab;
