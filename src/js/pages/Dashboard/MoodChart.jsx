import {Area, AreaChart, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {Tooltip} from "recharts";

function MoodChart({films}){

	const moodMap = {
		Cheerful: 4,
		Playful: 3,
		Introspective: 2,
		Tense: 1,
		Claustrophobic: 0,
		Magical: 5,
	};

	const moodByValue = Object.fromEntries(
		Object.entries(moodMap).map(([k, v]) => [v, k])
	);

	const chartData = [...films]
		.sort((a, b) => new Date(a.dateWatched) - new Date(b.dateWatched))
		.map(film => ({
			date: film.dateWatched,
			mood: moodMap[film.mood] || 2,
			moodLabel: film.mood,
			film: film.title,
			rating: film.rating,
		}));

	const formatMonthYear = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleString("en-US", { month: "short", year: "numeric" });
	};

	const customTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			const { moodLabel, film, rating } = payload[0].payload;
			return (
				<div style={{
					backgroundColor: "rgba(20, 20, 20, 0.9)",
					padding: "8px 12px",
					borderRadius: "8px",
					color: "#FFF",
					fontSize: "14px",
					fontWeight: 500,
					border: "1px solid #6D2C2C"
				}}>
					<p>{label}</p>
					<p>Mood: {moodLabel}</p>
					<p>Film: {film}</p>
					<p>Rating: {rating}</p>
				</div>
			);
		}
		return null;
	};

	return (
		<div className="w-full min-h-[300px]">
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart
					data={chartData}
					margin={{ top: 20, right: 30, left: 60, bottom: 20 }}
				>
					<XAxis
						dataKey="date"
						tickFormatter={formatMonthYear}
						stroke="#A1A1A1"
						tick={{ fill: "#A1A1A1", fontSize: 12, dy: 8 }}
					/>
					<YAxis
						domain={[0, 5]}
						tickFormatter={(val) => moodByValue[val] || ''}
						stroke="#A1A1A1"
						tick={{ fill: "#A1A1A1", fontSize: 12, dx: -8 }}
					/>
					<Tooltip content={customTooltip} />
					<Area
						type="monotone"
						dataKey="mood"
						stroke="#6D2C2C"
						fill="rgba(109,44,44,0.2)"
						dot={{ r: 6 }}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);

}

export default MoodChart;