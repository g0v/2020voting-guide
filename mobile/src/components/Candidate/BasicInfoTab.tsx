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
                        <Box key={education}>
                            {education}
                            <br />
                        </Box>
                    ))}
                </Typography>
            </BasePaper>
            <Box p={1} bgcolor={theme.palette.background.default} />
            <BasePaper title="經歷">
                <Typography variant="body1" color="textSecondary">
                    {experiences.map(experience => (
                        <Box key={experience}>
                            {experience}
                            <br />
                        </Box>
                    ))}
                </Typography>
            </BasePaper>
            <Box p={1} bgcolor={theme.palette.background.default} />
            <BasePaper title="政見">
                <Typography variant="body1" color="textSecondary">
                    {politics.map((politic, i) => (
                        <Box key={politic}>
                            {i + 1}. {politic}
                            <br />
                        </Box>
                    ))}
                </Typography>
            </BasePaper>
        </>
    );
};

export default BasicInfoTab;
