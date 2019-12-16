import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const BAR_HEIGHT = 340;

const INCOME = 'income';
const EXPENSE = 'expense';

const getBarHeight = (
    item: string,
    totalIncome: number,
    totalExpense: number
) => {
    if (item === INCOME) {
        if (totalIncome > totalExpense) {
            return BAR_HEIGHT;
        } else {
            return (BAR_HEIGHT * totalIncome) / totalExpense;
        }
    } else {
        if (totalIncome < totalExpense) {
            return BAR_HEIGHT;
        } else {
            return (BAR_HEIGHT * totalExpense) / totalIncome;
        }
    }
};

const useStyles = makeStyles({
    bar: {
        width: '42px',
        color: 'white'
    },
    barChild: {
        borderBottom: '1px solid white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: (props: any) => props.height + 'px',
        background: (props: any) =>
            props.item === INCOME ? '#3199BA' : '#D4AF37',
        opacity: (props: any) =>
            props.active
                ? props.first
                    ? 1
                    : 0.7
                : props.first
                ? 0.3
                : 0.7 * 0.3
    },
    barText: {
        color: (props: any) => (props.item === INCOME ? '#3199BA' : '#D4AF37'),
        opacity: (props: any) => (props.active ? 1 : 0.7)
    },
    text: {
        color: (props: any) => (props.item === INCOME ? '#3199BA' : '#D4AF37')
    }
});

interface ContributionChart {
    income: { name: string; percent: number; value: number }[];
    expense: { name: string; percent: number; value: number }[];
    totalIncome: number;
    totalExpense: number;
}

const StyledComponent = (props: any) => {
    const classes = useStyles(props);
		const { styleName, children } = props;
    return <div className={(classes as any)[styleName]}>{children}</div>;
};

const ContributionChart = ({
    income,
    expense,
    totalIncome,
    totalExpense
}: ContributionChart) => {
    const [activedContribution, setActivedContribution] = React.useState(
        INCOME
    );

    return (
        <>
            <Box display="flex" justifyContent="center">
                <Box
                    marginRight="15px"
                    alignSelf="flex-end"
                    onClick={() => setActivedContribution(INCOME)}
                >
                    <StyledComponent
                        item={INCOME}
                        styleName="bar"
                        active={activedContribution === INCOME}
                    >
                        {income
                            .sort((a, b) => b.value - a.value)
                            .map((incomeItem, index) => (
                            <StyledComponent
                                key={incomeItem.name}
                                styleName="barChild"
                                item={INCOME}
                                first={index === 0}
                                active={activedContribution === INCOME}
                                height={
                                    getBarHeight(
                                            INCOME,
                                            totalIncome,
                                            totalExpense
                                    ) * incomeItem.percent * 0.01}
                                style={{
                                    background: 'red',
                                    height:
                                        getBarHeight(
                                            INCOME,
                                            totalIncome,
                                            totalExpense
                                        ) *
                                            incomeItem.percent *
                                            0.01
                                }}
                            >
                                {index === 0
                                    ? Math.round(incomeItem.percent) + '%'
                                    : ''}
                            </StyledComponent>
                        ))}
                    </StyledComponent>
                    <StyledComponent
                        styleName="barText"
                        item={INCOME}
                        active={activedContribution === INCOME}
                    >
                        收入
                    </StyledComponent>
                </Box>
                <Box
                    alignSelf="flex-end"
                    onClick={() => setActivedContribution(EXPENSE)}
                >
                    <StyledComponent
                        styleName="bar"
                        item={EXPENSE}
                        active={activedContribution === EXPENSE}
                    >
                        {expense
                            .sort((a, b) => b.value - a.value)
                            .map((expenseItem, index) => (
                            <StyledComponent
                                key={expenseItem.name}
                                styleName="barChild"
                                item={EXPENSE}
                                active={activedContribution === EXPENSE}
                                first={index === 0}
                                height={
                                    getBarHeight(
                                        EXPENSE,
                                            totalIncome,
                                            totalExpense
                                    ) * expenseItem.percent * 0.01}
                            >
                                {index === 0
                                    ? Math.round(expenseItem.percent) + '%'
                                    : ''}
                            </StyledComponent>
                        ))}
                    </StyledComponent>
                    <StyledComponent
                        styleName="barText"
                        item={EXPENSE}
                        active={activedContribution === EXPENSE}
                    >
                        支出
                    </StyledComponent>
                </Box>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    flexDirection="column"
                    marginLeft="30px"
                    minWidth="200px"
                    color="#3199BA"
                >
                    <StyledComponent
                        styleName="text"
                        item={activedContribution}
                    >
                        {(activedContribution === INCOME ? income : expense)
                            .length ? (
                            (activedContribution === INCOME
                                ? income
                                : expense
                            ).map((incomeItem: any, index: number) =>
                                index === 0 ? (
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                    >
                                        <Typography variant="h4">
                                            {incomeItem.name}
                                        </Typography>
                                        <Typography variant="h4">
                                            {incomeItem.value.toLocaleString()}
                                        </Typography>
                                    </Box>
                                ) : (
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                    >
                                        <Typography variant="h5">
                                            {incomeItem.name}
                                        </Typography>
                                        <Typography variant="h5">
                                            {incomeItem.value.toLocaleString()}
                                        </Typography>
                                    </Box>
                                )
                            )
                        ) : (
                            <div></div>
                        )}
                    </StyledComponent>
                    <StyledComponent
                        styleName="text"
                        item={activedContribution}
                    >
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="h3">
                                {activedContribution === 'income'
                                    ? '收入合計'
                                    : '支出合計'}
                            </Typography>
                            <Typography variant="h3">
                                {activedContribution === 'income'
                                    ? Math.round(
                                          totalIncome / 10000
                                      ).toLocaleString()
                                    : Math.round(
                                          totalExpense / 10000
                                      ).toLocaleString()}{' '}
                                萬元
                            </Typography>
                        </Box>
                    </StyledComponent>
                </Box>
            </Box>
        </>
    );
};

export default ContributionChart;
