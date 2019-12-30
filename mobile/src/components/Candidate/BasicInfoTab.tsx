import { Box, Typography, Link } from '@material-ui/core';
import React from 'react';
import Issue from '../Issue';
import Alert from '../Alert';

const EduExp = ({
    education,
    experience,
    educationConnection,
    experienceConnection
}: {
    experience: string;
    education: string;
    educationConnection: string;
    experienceConnection: string;
}) => (
    <>
        <Box>
            <Box px={1.5} pt={2}>
                <Issue name="學歷 / 經歷" />
            </Box>
            <Alert>
                {education && (
                    <Typography variant="h5" gutterBottom>
                        學歷資料來自選前大補帖所搜集的{' '}
                        <Link
                            href={educationConnection}
                            target="_blank"
                            rel="noopener"
                        >
                            <u>網路公開資料</u>
                        </Link>
                    </Typography>
                )}
                {experience && (
                    <Typography variant="h5">
                        經歷資料來自選前大補帖所搜集的{' '}
                        <Link
                            href={experienceConnection}
                            target="_blank"
                            rel="noopener"
                        >
                            <u>網路公開資料</u>
                        </Link>
                    </Typography>
                )}
            </Alert>
        </Box>
        <Box px={1.5} bgcolor="#FFFFFF" py={3}>
            {education && (
                <>
                    <Typography variant="h2" gutterBottom>
                        學歷
                    </Typography>
                    {education.split('\n').map(edu => (
                        <Typography
                            variant="h4"
                            color="textSecondary"
                            key={edu}
                        >
                            {edu}
                        </Typography>
                    ))}
                </>
            )}
            <Box height={24} />
            {experience && (
                <>
                    <Typography variant="h2" gutterBottom>
                        經歷
                    </Typography>
                    {experience.split('\n').map(exp => (
                        <Typography
                            variant="h4"
                            color="textSecondary"
                            key={exp}
                        >
                            {exp}
                        </Typography>
                    ))}
                </>
            )}
        </Box>
    </>
);

const Politic = ({
    isRegional,
    politic,
    politicsConnection
}: {
    isRegional: boolean;
    politic: string;
    politicsConnection: string;
}) => (
    <>
        <Box px={1.5} pt={2}>
            <Issue name="政見" />
        </Box>
        {isRegional == false ? (
            <>
                <Alert>
                    <Typography variant="h4" color="textPrimary" gutterBottom>
                        沒有個人政見
                    </Typography>
                    <Typography variant="h5" color="textSecondary">
                        這位是不分區候選人，所以沒有個人政見，請參考提名政黨的政見
                    </Typography>
                </Alert>
                <Box bgcolor="#F7F7F7" height={72} />
            </>
        ) : politic ? (
            <>
                <Alert>
                    <Typography variant="h5">
                        政見資料來自選前大補帖所搜集的{' '}
                        <Link
                            href={politicsConnection}
                            target="_blank"
                            rel="noopener"
                        >
                            <u>網路公開資料</u>
                        </Link>
                    </Typography>
                </Alert>
                <Box px={1.5} bgcolor="#FFFFFF" py={3}>
                    {politic.split('\n').map(pol => (
                        <Typography
                            variant="h4"
                            color="textSecondary"
                            gutterBottom
                        >
                            {pol}
                        </Typography>
                    ))}
                </Box>
            </>
        ) : (
            <Box textAlign="center" pb={9}>
                <img
                    width="150"
                    height="150"
                    src="/img/doll/no_politic.svg"
                    alt="沒有政見"
                />
                <Box py={1}>
                    <Typography variant="h4">
                        政見還沒公告，再等一下！
                    </Typography>
                </Box>
                <Typography variant="h5" color="textSecondary" gutterBottom>
                    目前沒有本次政見資訊
                </Typography>
                <Typography variant="h5" color="textSecondary">
                    透過其他方法去認識他
                </Typography>
            </Box>
        )}
    </>
);

const BasicInfoTab = ({
    padding,
    education,
    experience,
    politic,
    educationConnection,
    experienceConnection,
    politicsConnection,
    isRegional
}: {
    experience: string;
    education: string;
    politic: string;
    educationConnection: string;
    experienceConnection: string;
    politicsConnection: string;
    isRegional: boolean;
    padding?: object;
}) => {
    return (
        <Box bgcolor="#F7F7F7" style={padding}>
            {(education || experience) && (
                <EduExp
                    education={education}
                    experience={experience}
                    educationConnection={educationConnection}
                    experienceConnection={experienceConnection}
                />
            )}
            <Politic
                isRegional={isRegional}
                politic={politic}
                politicsConnection={politicsConnection}
            />
        </Box>
    );
};

export default BasicInfoTab;
