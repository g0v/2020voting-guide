import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { BarChart, Bar, ResponsiveContainer, Tooltip, Label } from 'recharts';
import { makeStyles } from '@material-ui/styles';

const basebar = {
	width: '42px',
	height: '340px',
	border: '1px solid white'
}

const useStyles = makeStyles({
	bar: {
		width: '42px',
		height: '340px',
		background: (props:any) => props.item === 'income' ? '#3199BA' : '#D4AF37',
		opacity: (props:any) => props.active ? 1 : 0.7
	},
	barChild: {
    borderBottom: '1px solid white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white'
	},
	barText: {
		color: (props:any) => props.item === 'income' ? '#3199BA' : '#D4AF37',
		opacity: (props:any) => props.active ? 1 : 0.7
	},
	text: {
		color: (props:any) => props.item === 'income' ? '#3199BA' : '#D4AF37'
	}
});

interface ContributionChart {
	income: { name: string; percent: number; value: number }[];
	expense: { name: string; percent: number; value: number }[];
	totalIncome: number;
	totalExpense: number;
}

const ContributionChart = ({ income, expense, totalIncome, totalExpense }: ContributionChart) => {

	const classes = useStyles;
	const [activedContribution, setActivedContribution] = React.useState('income');

	return (
		<>
			<Box display="flex" justifyContent="center">
				<Box marginRight="15px" onClick={() => setActivedContribution('income')}>
					<div className={classes({
						item: 'income',
						active: activedContribution === 'income'
						}).bar}>
						{
							income.map((incomeItem, index) => (
							<div
								className={classes({ item: 'income' }).barChild}
								style={{ height: (340 * incomeItem.percent * 0.01) + 'px'}}>
									{index === 0 ? Math.round(incomeItem.percent) + '%' : ''}
								</div>
							))
						}
					</div>
					<span className={classes({
						item: 'income',
						active: activedContribution === 'income'
						}).barText}>收入</span>
				</Box>
				<Box onClick={() => setActivedContribution('expense')}>
					<div className={classes({
						item: 'expense',
						active: activedContribution === 'expense'
					}).bar}>
						{
							expense.map((incomeItem, index) => (
							<div
								className={classes({ item: 'expense' }).barChild}
								style={{ height: (340 * incomeItem.percent * 0.01) + 'px'}}>
									{index === 0 ? Math.round(incomeItem.percent) + '%' : ''}
								</div>
							))
						}
					</div>
					<span className={classes({
						item: 'expense',
						active: activedContribution === 'expense'
					}).barText}>支出</span>
				</Box>

				<Box display="flex" justifyContent="space-between" flexDirection="column"
					marginLeft="30px" minWidth="200px" color="#3199BA">
					<div className={classes({
						item: activedContribution
					}).text}>
						{
							(activedContribution === 'income' ? income : expense).length ? (
								(activedContribution === 'income' ? income : expense)
								.map((incomeItem:any, index:number) => index === 0 ? (
								<Box display="flex" justifyContent="space-between">
									<Typography variant="h4">{incomeItem.name}</Typography>
									<Typography variant="h4">{(incomeItem.value)}</Typography>
								</Box>
							) : (
								<Box display="flex" justifyContent="space-between">
									<Typography variant="h5">{incomeItem.name}</Typography>
									<Typography variant="h5">{(incomeItem.value)}</Typography>
								</Box>
							))
							) : (
								<div>123</div>
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