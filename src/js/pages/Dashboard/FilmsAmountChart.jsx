import {Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

function FilmsAmountChart({films}) {

	const chartData = Object.entries(
		films.reduce((acc, film) => {
			const year = new Date(film.dateWatched).getFullYear();
			acc[year] = (acc[year] || 0) + 1;
			return acc;
		}, {})
	).map(([year, amount]) => ({ year, amount }));

	const customTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			const { amount } = payload[0].payload;
			return (
				<div style={{
					backgroundColor: "rgba(220,3,79,0.58)",
					padding: "8px 12px",
					borderRadius: "8px",
					color: "#FFF",
					fontSize: "14px",
					fontWeight: 500,
					border: "1px solid #780f33"
				}}>
					<p>{label}</p>
					<p>Films: {amount}</p>
				</div>
			);
		}
		return null;
	};




	return(
		<div className="w-full min-h-[300px]">
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					data={chartData}
					margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
				>
				<XAxis dataKey="year" stroke="#A1A1A1" tick={{ fill: "#A1A1A1", fontSize: 12, dy: 8 }}/>
				<YAxis domain={[0, 10]} stroke="#A1A1A1" tick={{ fill: "#A1A1A1", fontSize: 12, dx: -8 }}/>
				<Tooltip content={customTooltip} />
				<Bar
					dataKey="amount"
					fill="#55142587"
					radius={[10, 10, 0, 0]}
					activeBar={{ fill: '#780f33'}}
				/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

export default FilmsAmountChart;