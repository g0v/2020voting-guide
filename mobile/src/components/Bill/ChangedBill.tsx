import React from 'react';
import {Typography} from '@material-ui/core'
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles'
import { diff_match_patch as DiffMatchPatch } from 'diff-match-patch';

const useStyle = makeStyles((theme: Theme) =>
    createStyles({
        deleteInner: {
            color: '#555555'
        },
        deleteOuter: {
            padding: 2,
            color: theme.palette.primary.main,
            textDecoration: 'line-through'
        },
        add: {
            color: theme.palette.primary.main
        }
    })
);

const ChangedBill = ({
    index,
    activeLaw,
    reviseLaw
}: {
    index: number;
    activeLaw: string;
    reviseLaw: string;
}) => {
    const classes = useStyle();
    const dmp = new DiffMatchPatch();
    const diff = dmp.diff_main(activeLaw, reviseLaw);
    const diff_html = diff.map(d => {
        if (d[0] === -1) {
            return (
                <span className={classes.deleteOuter}>
                    <span className={classes.deleteInner}>{d[1]}</span>
                </span>
            );
        } else if (d[0] === 1) {
            return <span className={classes.add}>{d[1]}</span>;
        } else {
            return <>{d[1]}</>;
        }
    });
    return (
        <Typography variant="h5">
            {index}. {diff_html}
        </Typography>
    );
};

export default ChangedBill;