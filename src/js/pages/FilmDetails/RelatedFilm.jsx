import {useNavigate} from "react-router-dom";
import {getFallbackGradient} from "../../shared/utils/moodColor.js";
import {usePoster} from "../../shared/utils/usePoster.js";

function RelatedFilm ({ film }) {
	const navigate = useNavigate();
	const posterUrl = usePoster(film.title);
	return (
		<div className="related__card flex flex-col gap-2 rounded-xl bg-[var(--color-bg-surface)] p-4 text-white cursor-pointer text-center"
			 onClick={() => navigate(`/films/${film.id}`)}>
			<div className="related__card-container min-h-[150px] rounded-lg">
				{posterUrl ? (
					<img
						src={posterUrl}
						alt={film.title}
						className="h-full w-full object-cover rounded-lg"
					/>
				) : (
					<div className="h-full text-[var(--color-text-muted)] text-lg text-center flex items-center justify-center px-2 rounded-lg" style={{ background: getFallbackGradient(film.mood) }}>
						{film.title}
					</div>
				)}
			</div>
			<p className="related__card-title text-base font-medium mt-2">{film.title}</p>
			<span className="text-sm text-[var(--color-text-muted)]">{film.director}</span>
		</div>
	)
}

export default RelatedFilm;