// import { ResponsiveContainer } from '@material-ui/core';
import React from 'react';
import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";

interface CompareBarChart {
	data: {
		name: string;
		totalIncome: number;
		totalExpense: number
	}[];
	name: string;
}

const legandMapping: {[key: string]: string} = {
	'totalIncome': '收入',
	'totalExpense': '支出'
}

const renderColorfulLegendText = (value: string, entry: any) => {
	const { color } = entry;
	const text = legandMapping[value];

	return <span style={{ color }}>
		<span style={{color: 'rgba(0, 0, 0, 0.54)', fontSize: '14px'}}>{text}</span>
	</span>;
}

const CompareBarChart = ({ data, name }: CompareBarChart) => {

	const currentName = name

	const normalizeData = data.map(val => {
		return {
			name: val.name,
			totalIncome: val.totalIncome / 1000000,
			totalExpense: val.totalExpense / 1000000
		}
	})
	return (
		<>
			<ResponsiveContainer width="100%" height={350}>
				<BarChart
					data={normalizeData}
					margin={{
						top: 40, right: 80, bottom: 20, left: 20,
					}}>

					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis label={{ value: '百萬', angle: 0, position: 'top', offset: 20, fontSize: 14, fill: 'rgba(0, 0, 0, 0.54)' }}/>
					<Tooltip />
        	<Legend formatter={renderColorfulLegendText} />
					<Bar dataKey="totalIncome" fill="#3199BA" barSize={17} />
					<Bar dataKey="totalExpense" fill="#D4AF37" barSize={17} />
				</BarChart>
			</ResponsiveContainer>
		</>
	)
}

export default CompareBarChart