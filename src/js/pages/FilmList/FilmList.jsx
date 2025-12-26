import debounce from 'lodash.debounce';
import useFilmStore from "../../shared/store/useFilmStore.js";
import {useEffect, useMemo, useState} from "react";
import Select from "react-select";
import FilmCard from "./FilmCard.jsx";

function FilmList() {
	const films = useFilmStore((state) => state.films);
	const genres = Array.from(new Set(films.flatMap(film => film.genres))).map(genre => ({
		value: genre,
		label: genre
	}));
	const [query, setQuery] = useState('');
	const [selectedGenres, setSelectedGenres] = useState([]);
	const [selectedMood, setSelectedMood] = useState(null);
	const moodMap = {
		Claustrophobic: 0,
		Tense: 1,
		Introspective: 2,
		Playful: 3,
		Cheerful: 4,
		Magical: 5,
	};
	const rates = [...Array(11).keys()].map(rate => ({
		value: rate,
		label: rate
	}));
	const [selectedRate, setSelectedRate] = useState(null);
	const sortOptions = ['Newest first', 'Oldest first', 'Highest rating', 'Lowest rating'].map(opt => ({
		value: opt,
		label: opt
	}));
	const [selectedSort, setSelectedSort] = useState('Newest first');

	const filteredFilms = useMemo(() => {
		return films.filter((film) => {
			const matchesQuery =
				query === '' ||
				film.title.toLowerCase().includes(query);

			const matchesGenres =
				selectedGenres.length === 0 ||
				selectedGenres.every((genre) =>
					film.genres.includes(genre)
				);

			const matchesMood =
				selectedMood == null ||
				film.mood === selectedMood;

			const matchesRate =
				selectedRate === null ||
				film.rating >= selectedRate;

			return matchesQuery && matchesGenres && matchesMood && matchesRate;
		}).sort((a, b) => {
			if (selectedSort === 'Newest first') {
				return new Date(b.dateWatched) - new Date(a.dateWatched);
			}
			if (selectedSort === 'Oldest first') {
				return new Date(a.dateWatched) - new Date(b.dateWatched);
			}
			if (selectedSort === 'Highest rating') {
				return a.rating - b.rating;
			}
			if (selectedSort === 'Lowest rating') {
				return b.rating - a.rating;
			}
		});
	}, [films, query, selectedGenres, selectedMood, selectedRate, selectedSort]);

	const handleSearch = (e) => {
		setQuery(e.target.value.toLowerCase());
	};

	const handleMoodChange = (mood) => {
		setSelectedMood((prev) => (prev === mood ? null : mood));
	};

	const handleReset = () => {
		setQuery('');
		setSelectedGenres([]);
		setSelectedMood(null);
		setSelectedRate(null);
		setSelectedSort('Newest first');
	}

	const debouncedResults = useMemo(() => {
		return debounce(handleSearch, 300);
	}, []);

	useEffect(() => {
		return () => {
			debouncedResults.cancel();
		}
	});


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
		<div className="h-full">
			{films.length > 0
				? <div className="flex flex-col items-center gap-8">
					<div className="grid gap-4 p-4 mt-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-10 items-end">
						<label className="relative w-full text-[var(--color-text-secondary)] lg:col-span-3">
							<input
								type="search"
								value={query}
								onChange={handleSearch}
								placeholder="Search"
								className="film-list__input film-list__input-search rounded-3xl p-2 w-full"
							/>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none"
								fill="none"
								viewBox="0 0 24 24"
								stroke="#6F6F73"
								strokeWidth={1.5}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21 21l-5.197-5.197M15.803 15.803A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
								/>
							</svg>
							<svg onClick={() => setQuery('')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#780F33CC" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white cursor-pointer">
								<path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
							</svg>
						</label>

						<label className="w-full lg:col-span-2">
							<Select
								value={genres.filter(genre =>
									selectedGenres.includes(genre.value)
								)}
								isMulti
								name="genres"
								options={genres}
								styles={colourStyles}
								placeholder="Genres"
								className="w-full"
								onChange={(e) => { setSelectedGenres(e.map((item) => item.value))}}
							/>
						</label>

						<label className="w-full lg:col-span-2">
							<Select
								value={rates.find(r => r.value === selectedRate) || null}
								name="rate"
								options={rates}
								styles={colourStyles}
								placeholder="Rate"
								className="w-full"
								onChange={(e) => { setSelectedRate(e.value)}}
							/>
						</label>

						<label className="w-full text-[var(--color-text-secondary)] lg:col-span-2">
							<Select
								defaultValue={sortOptions[0]}
								name="sort"
								options={sortOptions}
								styles={colourStyles}
								placeholder="Sort by"
								className="w-full"
								onChange={(e) => { setSelectedSort(e.value)}}
							/>
						</label>

						<label className="w-full lg:col-span-1">
							<button
								onClick={handleReset}
								className="film-list__btn form__btn text-[var(--color-text-muted)] rounded-3xl w-full"
							>
								Clear all
							</button>
						</label>

						<div className="mood-filter flex flex-col gap-2 lg:col-span-10 xl:col-span-10 lg:mt-4 text-center">
							<p className="text-base">Mood</p>
							<div className="flex flex-wrap justify-center">
								{Object.entries(moodMap).map(([mood, value]) => {
									return (
										<label
											key={value}
											data-mood={value}
											onClick={() => handleMoodChange(mood)}
											className="mood-filter__label px-3 py-1 flex flex-col gap-2 items-center text-xs font-light cursor-pointer">
											{mood.toLowerCase()}
											<input
												type="radio"
												className={`mood-filter__input ${selectedMood !== mood && 'hidden'}`}
												name="mood"
												checked={selectedMood === mood}
												readOnly/>
										</label>
									)
								})}
							</div>
						</div>
					</div>
					{filteredFilms.length > 0
						? <div className="grid gap-10 mt-4 sm:grid-cols-2 md:grid-cols-4 xs:grid-cols-1">
							{filteredFilms.map(film => {return (
								<FilmCard key={film.id} film={film}/>
							)
							})}
						</div>
						: <div
							className="min-h-[200px] md:min-h-[50vh] flex flex-col items-center justify-center gap-2 text-center">
							<p className="text-xl text-[var(--color-text-primary)]">No films match your filters 💔</p>
							<p className="text-xl text-[var(--color-text-primary)]">Try adjusting them</p>
						</div>
					}

				</div>
				: <div
					className="min-h-[200px] md:min-h-[50vh] flex flex-col items-center justify-center gap-2 text-center">
					<p className="text-xl text-[var(--color-text-primary)]">There is no films in your diary yet 💔</p>
					<p className="text-xl text-[var(--color-text-primary)]">Feel free to add some via button on top
						😉</p>
				</div>
			}
		</div>
	)
}

export default FilmList;