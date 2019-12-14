import { Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { diff_match_patch as DiffMatchPatch } from 'diff-match-patch';
import React from 'react';
import './ChangedBill.scss';
const useStyle = makeStyles((theme: Theme) =>
    createStyles({
        deleteInner: {
            color: '#555555'
        },
        deleteOuter: {
            padding: 2,
            color: theme.palette.primary.main
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
    const diffHTML = diff.map(d => {
        if (d[0] === -1) {
            return (
                <span
                    className={clsx(
                        'changedbill__delete-outer',
                        classes.deleteOuter
                    )}
                >
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
        <Typography variant="h4">
            {index}. {diffHTML}
        </Typography>
    );
};

export default ChangedBill;
