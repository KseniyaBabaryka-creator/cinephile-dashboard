import {usePoster} from "../../shared/utils/usePoster.js";
import {useState} from "react";
import useFilmStore from "../../shared/store/useFilmStore.js";
import {Link} from "react-router-dom";

function FilmCard({film}) {
	const moodMap = {
		Claustrophobic: 0,
		Tense: 1,
		Introspective: 2,
		Playful: 3,
		Cheerful: 4,
		Magical: 5,
	};

	const posterUrl = usePoster(film.title);
	const [showConfirm, setShowConfirm] = useState(false);
	const removeFilm = useFilmStore(state => state.removeFilm);

	const handleDeleteClick = () => {
		removeFilm(film.id);
	};

	return(
		<div className="film-card flex flex-col gap-4 col-span-1 rounded-xl bg-[var(--color-bg-surface)] p-4 relative">
			<div className="film-card__container min-h-[150px] rounded-xl">
				{posterUrl ? (
					<img
						src={posterUrl}
						alt={film.title}
						className="h-full w-full object-cover rounded-lg"
					/>
				) : (
					<div className="h-full bg-[var(--color-bg-surface-elevated)] text-[var(--color-text-muted)] text-lg text-center flex items-center justify-center px-2">
						{film.title}
					</div>
				)}
			</div>
			<div className="flex flex-col gap-2 items-center text-center text-[var(--color-text-primary)]">
				<p className="text-xl font-medium">{film.title}</p>
				<p className="text-sm opacity-60">{film.year} • {film.director}</p>
				<div className="flex flex-wrap gap-2 items-center justify-center">
					{film.genres.map(genre => {return(
						<div key={genre} className="film-card__pill rounded-full text-xs px-3 py-1">{genre}</div>
					)})}
				</div>
				<div className="film-card__mood flex flex-wrap items-center justify-center text-center gap-4" data-mood={moodMap[film.mood]}>
					<span className="film-card__mood-text relative pl-[30px] text-sm font-light mt-3 mb-2">{film.mood}</span>
					<div className="flex items-center gap-2 text-lg">
						<span>{film.rating}</span>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
							 stroke-width="1.5" stroke="currentColor" className="size-6">
							<path stroke-linecap="round" stroke-linejoin="round"
								  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"/>
						</svg>

					</div>
				</div>

			</div>
			<div className={`film-card__actions-wrapper absolute ${showConfirm ? 'film-card__actions-wrapper--hidden' : ''}`}>
				<div className="film-card__actions flex gap-4 items-center rounded-lg absolute py-2 px-6 text-[var(--color-bg-primary)]">
					<Link to={`/films/${film.id}`} className="cursor-pointer">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
						</svg>
					</Link>
					<button className="cursor-pointer" onClick={() => setShowConfirm(true)}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
						</svg>
					</button>
				</div>
			</div>

			{showConfirm && (
				<div className="film-card__overlay" />
			)}
			{showConfirm && <div className="film-card__confirm flex flex-col gap-4 items-center text-[var(--color-text-secondary)] rounded-md bg-[var(--color-bg-primary)] py-4 font-light">
				<span className="text-base"><span className="text-[#780F33CC]">Delete</span> this film?</span>
				<div className="flex items-center justify-evenly w-full">
					<button className="film-card__confirm-btn text-sm cursor-pointer" onClick={() => setShowConfirm(false)}>Cancel</button>
					<button className="film-card__confirm-btn text-sm cursor-pointer" onClick={handleDeleteClick}>Delete</button>
				</div>
			</div>}
		</div>
	)
}

export default FilmCard;