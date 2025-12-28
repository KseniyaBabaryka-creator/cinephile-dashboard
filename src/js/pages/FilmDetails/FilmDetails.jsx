import {useNavigate, useParams} from "react-router-dom";
import useFilmStore from "../../shared/store/useFilmStore.js";
import {usePoster} from "../../shared/utils/usePoster.js";
import {getFallbackGradient, getMoodColor} from "../../shared/utils/moodColor.js";
import {useState} from "react";
import Select from "react-select";
import toast, {Toaster} from "react-hot-toast";
import RelatedFilm from "./RelatedFilm.jsx";

function FilmDetails() {
	const { id } = useParams();
	const films = useFilmStore(state => state.films);
	const film = films.find(f => f.id.toString() === id.toString());

	if (film === undefined) {
		const navigate = useNavigate();
		navigate('/filmlist');
	}
	const relatedFilms = films
		.filter(f => f.id.toString() !== film.id.toString() && f.genres.some(genre => film.genres.includes(genre)))
		.slice(0,4);

	const posterUrl = usePoster(film.title);
	const options = { year: 'numeric', month: 'long', day: 'numeric' };

	const [editMode, setEditMode] = useState(false);
	const [noteValue, setNoteValue] = useState(film.notes || '');
	const [rateValue, setRateValue] = useState(film.rating);
	const [moodValue, setMoodValue] = useState(film.mood);

	const updateFilm = useFilmStore(state => state.updateFilm);
	const notify = () => toast('🎬  Film edited successfully');

	const rates = [...Array(11).keys()].map(rate => ({
		value: rate,
		label: rate
	}));

	const moods = ['Cheerful', 'Playful', 'Introspective', 'Tense', 'Claustrophobic', 'Magical'].map(mood => ({
		value: mood,
		label: mood
	}));

	const handleEditClick = () => {
		setEditMode(true);
		setTimeout(() => {
			document.getElementById("notes").focus();
		}, 300);
	};

	const handleCancelClick = () => {
		setNoteValue(film.notes || '');
		setRateValue(film.rating);
		setMoodValue(film.mood)
		setEditMode(false);
	};

	const handleSaveClick = () => {
		film.notes = noteValue;
		film.rating = rateValue;
		film.mood = moodValue;

		updateFilm(film);
		notify();
		setEditMode(false);
	};

	const colourStyles = {
		control: (styles, { isFocused }) => ({
			...styles,
			backgroundColor: 'transparent',
			borderColor: isFocused ? '#55142587' : '#FFFFFF0F',
			borderRadius: '1.5rem',
			boxShadow: 'none',
			'&:hover': {
				borderColor: '#55142587',
			},
			minHeight: '42px',
			color: '#F5F5F5'
		}),

		menu: (base) => ({
			...base,
			backgroundColor: 'transparent',
			borderRadius: '1.5rem',
			marginTop: 6,
			boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
			overflow: 'hidden',
			borderColor: '#FFFFFF0F',
			borderStyle: 'solid',
			borderWidth: '1px',
		}),

		menuList: (base) => ({
			...base,
			padding: 0,
			backgroundColor: 'transparent',
			borderColor: '#F5F5F5',
		}),

		option: (styles, { isFocused, isSelected }) => ({
			...styles,
			backgroundColor: isSelected
				? 'transparent'
				: isFocused
					? 'rgba(255,255,255,0.24)'
					: 'transparent',
			color: '#F5F5F5',
			cursor: 'pointer',
			':active': {
				...styles[':active'],
				backgroundColor: 'rgba(109,44,44,0.3)',
			},
		}),

		multiValue: (styles) => ({
			...styles,
			backgroundColor: '#F5F5F5',
			borderRadius: '14px',
		}),

		multiValueLabel: (styles) => ({
			...styles,
			color: '#6D2C2C',
			fontWeight: 500,
		}),

		multiValueRemove: (styles) => ({
			...styles,
			color: '#6D2C2C',
			':hover': {
				backgroundColor: '#6D2C2C',
				color: '#FFF',
				borderRadius: '8px',
			},
		}),

		placeholder: (styles) => ({
			...styles,
			color: '#A1A1A1',
		}),

		singleValue: (styles) => ({
			...styles,
			color: '#A1A1A1',
		}),
	};


	return(
		<div className="py-8 px-4">
			<Toaster
				toastOptions={{
					style: {
						border: '1px solid #55142587',
						backgroundColor: '#1C1C1F',
						padding: '16px',
						color: '#F5F5F5',
					},
				}}
			/>
			<div className="film__hero grid grid-cols-1 sm:grid-cols-2 gap-10">
				<div className="film__hero__container max-h-[800px]">
					{posterUrl ? (
						<img
							src={posterUrl}
							alt={film.title}
							className="w-full h-full object-cover rounded-2xl aspect-2/3"
						/>
					) : (
						<div className="h-full text-[var(--color-text-muted)] text-lg md:text-2xl text-center flex items-center justify-center px-2 rounded-2xl" style={{ background: getFallbackGradient(film.mood) }}>
							{film.title}
						</div>
					)}
				</div>

				<div className="grid gap-8">
					<div className="film__hero-info flex flex-col items-start gap-6 px-6 py-8 bg-[var(--color-bg-surface)] rounded-3xl shadow-lg relative">
						<div className="film__hero-edit absolute cursor-pointer right-10 text-[var(--color-text-primary)]"
							onClick={() => handleEditClick()}
						>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
							</svg>
						</div>
						<h1 className="text-5xl font-semibold">{film.title}</h1>

						<div className="flex text-lg gap-6 text-[var(--color-text-secondary)] font-light">
							<span className="text-base">Year: <span className="text-lg text-[var(--color-text-primary)]">{film.year}</span></span>
							<span>•</span>
							<span className="text-base">Director: <span className="text-lg text-[var(--color-text-primary)]">{film.director}</span></span>
						</div>

						<div className="flex flex-wrap gap-3">
							{film.genres.map(genre => {return(
								<span key={genre} className="film__hero-pill px-4 py-2 rounded-full text-sm font-medium text-[var(--color-text-primary)]" style={{ background: getMoodColor(film.mood) }}>{genre}</span>
							)})}
						</div>

						<div className="flex flex-wrap items-center gap-6 justify-between mt-4">
							{editMode
								? <label>
									<Select
										value={rates.find(r => r.value === rateValue) || null}
										name="rate"
										options={rates}
										styles={colourStyles}
										placeholder="Rate"
										className="w-full"
										onChange={(e) => { setRateValue(e.value)}}
									/>
								</label>
								: <div className="flex items-center gap-2">
									<div className="flex items-center gap-1">
										{[...Array(5)].map((_, i) => (
											<svg key={i} className={`w-5 h-5 ${i < film.rating ? 'text-white' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 24 24">
												<path d="M12 .587l3.668 7.568L24 9.423l-6 5.857L19.335 24 12 20.201 4.665 24 6 15.28 0 9.423l8.332-1.268z"/>
											</svg>
										))}
									</div>
									<span className="text-lg font-medium text-[var(--color-text-primary)]">{film.rating}</span>
								</div>
							}

							{editMode
								? <label>
									<Select
										value={moods.find(m => m.value === moodValue) || null}
										options={moods}
										styles={colourStyles}
										name="mood"
										classNamePrefix="w-full"
										placeholder="Mood"
										onChange={(e) => { setMoodValue(e.value)}}
									/>
								</label>

								: <div className="film__hero-mood tracking-widest font-light text-lg py-2 px-4 relative" style={{color: getMoodColor(film.mood)}}>{film.mood.toUpperCase()}</div>
							}

							<div className="text-sm text-[var(--color-text-secondary)] font-light">Watched: <span className=" text-[var(--color-text-primary)]">{new Date(film.dateWatched).toLocaleDateString("en-US", options)}</span></div>
						</div>

						{editMode
							? <input
								type="textarea"
								value={noteValue}
								id="notes"
								onChange={(e) => setNoteValue(e.target.value)}
								className="film__hero-notes mt-4 p-4 w-full text-xl font-light italic rounded-2xl bg-[var(--color-bg-surface-elevated)] text-[var(--color-text-secondary)]"
								placeholder={film.notes ? film.notes : 'You didn’t leave any thoughts about this film.'}/>
							: <div className="film__hero-notes mt-4 p-4 w-full text-xl font-light italic rounded-2xl bg-[var(--color-bg-surface-elevated)] text-[var(--color-text-secondary)]">
								{film.notes ? film.notes : 'You didn’t leave any thoughts about this film.'}
							</div>
						}

						{editMode &&
							<div className="flex items-center justify-center gap-6 mx-auto mt-4">
								<button
									onClick={handleCancelClick}
									className="film__hero-btn bg-[var(--color-text-muted)] text-[var(--color-text-secondary)] w-[100px] py-2 rounded-lg cursor-pointer opacity-60">Cancel</button>
								<button
									onClick={handleSaveClick}
									className="film__hero-btn bg-[var(--color-text-muted)] text-[var(--color-text-secondary)] w-[100px] py-2 rounded-lg cursor-pointer opacity-60">Save</button>
							</div>
						}
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{relatedFilms.map(f => {return (
							<RelatedFilm key={f.id} film={f}/>
						)})}
					</div>
				</div>
			</div>
		</div>
	)
}

export default FilmDetails;