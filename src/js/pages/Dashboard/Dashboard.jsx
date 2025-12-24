import StatCard from "./StatCard.jsx";
import { films } from '/src/js/shared/mock/films.js'
import MoodChart from "./MoodChart.jsx";
import FilmsAmountChart from "./FilmsAmountChart.jsx";
import {getMostFrequent} from "../../utils/analytics.js";
function Dashboard() {

	const averageRate =
		films.length > 0
			? films.reduce((sum, film) => sum + film.rating, 0) / films.length
			: 0;

	const bestDirector = getMostFrequent(films.map(f => f.director));
	const bestGenre = getMostFrequent(films.flatMap(f => f.genres));


	return(
		<div className="w-full flex flex-col gap-8 p-4">
			<div className="w-full flex flex-wrap gap-4">
				<StatCard title={"Total Films"} text={films.length}/>
				<StatCard title={"Most Watched Director"} text={bestDirector || '-'}/>
				<StatCard title={"Favorite Genre"} text={bestGenre || '-'}/>
				<StatCard title={"Average Rating"} text={averageRate.toFixed(1) || 0}/>
			</div>
			<div className="card w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl">
				<div className="flex flex-col gap-4">
					<h2 className="text-2xl font-medium ml-4">Mood Over Time</h2>
					<MoodChart films={films} />
				</div>

				<div className="flex flex-col gap-4">
					<h2 className="text-2xl font-medium ml-4">Films Per Year</h2>
					<FilmsAmountChart films={films} />
				</div>
			</div>
		</div>
	)
}

export default Dashboard;