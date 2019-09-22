import { Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import React from 'react';
import BasePaper from '../BasePaper';

interface BasicInfoTab {
    educations: string[];
    experiences: string[];
    politics: string[];
}

const BasicInfoTab = ({ educations, experiences, politics }: BasicInfoTab) => {
    const theme = useTheme();
    return (
        <>
            <Box p={1} bgcolor={theme.palette.background.default} />
            <BasePaper title="學歷">
                <Typography variant="body1" color="textSecondary">
                    {educations.map(education => (
                        <>
                            {education}
                            <br />
                        </>
                    ))}
                </Typography>
            </BasePaper>
            <Box p={1} bgcolor={theme.palette.background.default} />
            <BasePaper title="經歷">
                <Typography variant="body1" color="textSecondary">
                    {experiences.map(experience => (
                        <>
                            {experience}
                            <br />
                        </>
                    ))}
                </Typography>
            </BasePaper>
            <Box p={1} bgcolor={theme.palette.background.default} />
            <BasePaper title="政見">
                <Typography variant="body1" color="textSecondary">
                    {politics.map((politic, i) => (
                        <>
                            {i + 1}. {politic}
                            <br />
                        </>
                    ))}
                </Typography>
            </BasePaper>
        </>
    );
};

export default BasicInfoTab;
