import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    card: {
        width: 157,
        height: 159,
        margin: '7px 5px',
        display: 'inline-flex',
        flexDirection: 'column',
        paddingTop: 29,
        paddingLeft: 14,
        backgroundColor: '#E1E1E1'
    },
    photo: {
        width: 40,
        height: 40,
        borderRadius: '50%'
    },
    title: {
        verticalAlign: 'middle'
    },
    name: {
        marginLeft: 8,
        fontSize: 16
    },
    contentRow: {
        marginTop: 7,
        marginBottom: 0,
        fontSize: 14,
        lineHeight: '16px'
    }
});

interface Party {
    id: string;
    name: string;
    emblem: string;
}

export interface CandidateProps {
    id: string;
    name: string;
    photo: string;
    party: Party;
    experience: string;
}

export const CandidateCard: React.FunctionComponent<CandidateProps> = ({
    name,
    party,
    experience
}) => {
    const classes = useStyles();

    return (
        <div className={classes.card}>
            <div className={classes.title}>
                <img
                    className={classes.photo}
                    src="https://upload.wikimedia.org/wikipedia/commons/0/01/Wan-An_Jiang_Portrait_20150613.jpg"
                    alt="candidate"
                />
                <span className={classes.name}>{name}</span>
            </div>
            <p className={classes.contentRow}>{party}</p>
            {/* <p className={classes.contentRow}>{experience}</p> */}
            {/* <p className={classes.contentRow}>中文測試</p> */}
        </div>
    );
};
