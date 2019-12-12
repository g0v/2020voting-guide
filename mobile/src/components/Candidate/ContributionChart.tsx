import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const BAR_HEIGHT = 340

const INCOME = 'income'
const EXPENSE = 'expense'

const getBarHeight = (item:string, totalIncome:number, totalExpense:number) => {
	if (item === INCOME) {
		if (totalIncome > totalExpense) {
			return BAR_HEIGHT
		} else {
			return BAR_HEIGHT * totalIncome / totalExpense
		}
	} else {
		if (totalIncome < totalExpense) {
			return BAR_HEIGHT
		} else {
			return BAR_HEIGHT * totalExpense / totalIncome
		}
	}
}

const useStyles = makeStyles({
	bar: {
		width: '42px',
		height: getBarHeight + 'px',
		color: 'white',
	},
	barChild: {
    borderBottom: '1px solid white',
    display: 'flex',
    justifyContent: 'center',
		alignItems: 'center',
		background: (props:any) => props.item === INCOME ? '#3199BA' : '#D4AF37',
		opacity: (props:any) => props.active ? (props.first ? 1 : 0.7) : (props.first ? 0.3 : 0.7 * 0.3)
	},
	barText: {
		color: (props:any) => props.item === INCOME ? '#3199BA' : '#D4AF37',
		opacity: (props:any) => props.active ? 1 : 0.7
	},
	text: {
		color: (props:any) => props.item === INCOME ? '#3199BA' : '#D4AF37'
	}
});

interface ContributionChart {
	income: { name: string; percent: number; value: number }[];
	expense: { name: string; percent: number; value: number }[];
	totalIncome: number;
	totalExpense: number;
}

const ContributionChart = ({
	income,
	expense,
	totalIncome,
	totalExpense }: ContributionChart) => {

	const classes = useStyles;
	const [activedContribution, setActivedContribution] = React.useState(INCOME);

	return (
		<>
			<Box display="flex" justifyContent="center">
				<Box marginRight="15px" alignSelf="flex-end"
					onClick={() => setActivedContribution(INCOME)}>
					<div className={classes({
						item: INCOME,
						active: activedContribution === INCOME
						}).bar}>
						{
							income.map((incomeItem, index) => (
							<div
								className={classes({
									item: INCOME,
									active: activedContribution === INCOME,
									first: index === 0
								 }).barChild}
								style={{ height: (getBarHeight(INCOME, totalIncome, totalExpense) * incomeItem.percent * 0.01) + 'px'}}>
									{index === 0 ? Math.round(incomeItem.percent) + '%' : ''}
								</div>
							))
						}
					</div>
					<span className={classes({
						item: INCOME,
						active: activedContribution === INCOME
						}).barText}>收入</span>
				</Box>
				<Box alignSelf="flex-end" onClick={() => setActivedContribution(EXPENSE)}>
					<div className={classes({
						item: EXPENSE,
						active: activedContribution === EXPENSE
					}).bar}>
						{
							expense.map((incomeItem, index) => (
							<div
								className={classes({
									item: EXPENSE,
									active: activedContribution === EXPENSE,
									first: index === 0
								 }).barChild}
								style={{ height: (getBarHeight(EXPENSE, totalIncome, totalExpense) * incomeItem.percent * 0.01) + 'px'}}>
									{index === 0 ? Math.round(incomeItem.percent) + '%' : ''}
								</div>
							))
						}
					</div>
					<span className={classes({
						item: EXPENSE,
						active: activedContribution === EXPENSE
					}).barText}>支出</span>
				</Box>

				<Box display="flex" justifyContent="space-between" flexDirection="column"
					marginLeft="30px" minWidth="200px" color="#3199BA">
					<div className={classes({
						item: activedContribution
					}).text}>
						{
							(activedContribution === INCOME ? income : expense).length ? (
								(activedContribution === INCOME ? income : expense)
								.map((incomeItem:any, index:number) => index === 0 ? (
								<Box display="flex" justifyContent="space-between">
									<Typography variant="h4">{incomeItem.name}</Typography>
									<Typography variant="h4">{(incomeItem.value.toLocaleString())}</Typography>
								</Box>
							) : (
								<Box display="flex" justifyContent="space-between">
									<Typography variant="h5">{incomeItem.name}</Typography>
									<Typography variant="h5">{(incomeItem.value)}</Typography>
								</Box>
							))
							) : (
								<div></div>
							)
						}
					</div>
					<Box display="flex" justifyContent="space-between"
						className={classes({
							item: activedContribution
						}).text}>
						<Typography variant="h3">{
							activedContribution === 'income' ? '收入合計' : '支出合計'}</Typography>
						<Typography variant="h3">{
							activedContribution === 'income' ?
								Math.round(totalIncome / 10000).toLocaleString() :
								Math.round(totalExpense / 10000).toLocaleString() } 萬元</Typography>
					</Box>
				</Box>
			</Box>
		</>
	)
}

export default ContributionChart