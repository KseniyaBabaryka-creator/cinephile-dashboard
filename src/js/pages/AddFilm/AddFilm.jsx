import {Controller, useForm} from "react-hook-form"
import Select from 'react-select';
import {allFilmGenres} from "../../shared/mock/genres.js";
import useFilmStore from "../../shared/store/useFilmStore.js";
function AddFilm() {
	const {
		register,
		handleSubmit,
		watch,
		control,
		formState: { errors },
	} = useForm();

	const addFilm = useFilmStore(state => state.addFilm);


	const onSubmit = (data) => {
		if (Object.keys(errors).length > 0) {
			return;
		}

		const newFilm = {
			title: data.title,
			year: data.year.value,
			director: data.director || '',
			genres: data.genres.length >= 1 ? data.genres.map(genre => genre.value) : [],
			mood: data.mood.value,
			rating: data.rating.value,
			notes: data.notes || '',
			dateWatched: data.dateWatched
		};

		addFilm(newFilm);
	};

	let years = [];
	for (let i = (new Date().getFullYear()); i >= 1888; i--) {
		const year = {
			value: i,
			label: i
		};
		years.push(year);
	}

	const genres = allFilmGenres.map(genre => ({
		value: genre,
		label: genre
	}));


	const moods = ['Cheerful', 'Playful', 'Introspective', 'Tense', 'Claustrophobic', 'Magical'].map(mood => ({
		value: mood,
		label: mood
	}));

	const rates = [...Array(11).keys()].map(rate => ({
		value: rate,
		label: rate
	}));

	const colourStyles = {
		control: (styles, { isFocused }) => ({
			...styles,
			backgroundColor: '#A1A1A1',
			borderColor: isFocused ? '#6D2C2C' : '#1C1C1F',
			borderRadius: '12px',
			boxShadow: 'none',
			'&:hover': {
				borderColor: '#6D2C2C',
			},
			minHeight: '42px',
			color: '#55142587'
		}),

		option: (styles, { isFocused, isSelected }) => ({
			...styles,
			backgroundColor: isSelected
				? 'rgba(109,44,44,0.2)'
				: isFocused
					? '#55142587'
					: '#6F6F73',
			color: '#F5F5F5',
			cursor: 'pointer',
			':active': {
				...styles[':active'],
				backgroundColor: 'rgba(109,44,44,0.3)',
			},
		}),

		multiValue: (styles) => ({
			...styles,
			backgroundColor: 'rgba(109,44,44,0.15)',
			borderRadius: '8px',
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
			color: '#55142587',
		}),

		singleValue: (styles) => ({
			...styles,
			color: '#55142587',
		}),
	};

	return (
		<div className="card form__card flex flex-col items-start gap-6 w-[60%] m-auto mt-12 rounded-lg p-6">
			<h2 className="text-xl italic font-medium">Describe your most recent experience...</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 w-full m-auto">
				<label className="form__label col-span-7 grid gap-2 text-base items-start mb-4">
					Title
					<input
						{...register("title", { required: true })}
						className="form__input rounded-md p-1 w-full border-2 border-solid font-medium text-lg"
						placeholder="Title"
					/>
					{errors.title && <span className="text-xs text-(--color-accent-primary)">This field is required</span>}
				</label>

				<label className="form__label col-span-7 grid gap-2 text-base items-start mb-4">
					Year of Production
					<Controller
						name="year"
						control={control}
						defaultValue={years[0]}
						render={({ field }) => (
							<Select
								{...field}
								options={years}
								styles={colourStyles}
								classNamePrefix="select"
								placeholder="Select year"
							/>
						)}
					/>
				</label>

				<label className="form__label col-span-7 grid gap-2 text-base items-start mb-4">
					Director
					<input
						{...register("director")}
						className="form__input rounded-md p-1 w-full border-2 border-solid font-medium text-lg"
						placeholder="Director"
					/>
				</label>

				<label className="form__label col-span-7 grid gap-2 text-base items-start mb-4">
					Genres
					<Controller
						name="genres"
						control={control}
						defaultValue={genres[0]}
						render={({ field }) => (
							<Select
								{...field}
								isMulti
								options={genres}
								styles={colourStyles}
								classNamePrefix="select"
								placeholder="Select genres"
							/>
						)}
					/>
				</label>

				<label className="form__label col-span-7 grid gap-2 text-base items-start mb-4">
					Your Mood
					<Controller
						name="mood"
						control={control}
						defaultValue={moods[0]}
						render={({ field }) => (
							<Select
								{...field}
								options={moods}
								styles={colourStyles}
								classNamePrefix="select"
								placeholder="Select mood"
							/>
						)}
					/>
				</label>

				<label className="form__label col-span-7 grid gap-2 text-base items-start mb-4">
					Give it a rate
					<Controller
						name="rating"
						required="true"
						control={control}
						defaultValue={rates[0]}
						render={({ field }) => (
							<Select
								{...field}
								options={rates}
								styles={colourStyles}
								classNamePrefix="select"
								placeholder="Select year"
							/>
						)}
					/>
				</label>

				<label className="form__label col-span-7 grid gap-2 text-base items-start mb-4">
					Date Watched
					<input
						type="date"
						{...register("dateWatched", { required: true })}
						className="form__input rounded-md p-1 w-full border-2 border-solid font-medium text-lg"
					/>
					{errors.dateWatched && <span className="text-xs text-(--color-accent-primary)">This field is required</span>}
				</label>

				<label className="form__label col-span-7 grid gap-2 text-base items-start mb-4">
					Notes
					<textarea
						{...register("notes")}
						placeholder="Write your thoughts about the film..."
						rows={5}
						className="form__input rounded-md p-3 w-full  border resize-none focus:border-[#6D2C2C] focus:outline-none"
					/>
				</label>

				<label className="form__label col-span-7 grid gap-2 text-base items-start mb-4">
					<button type="submit" className="form__btn rounded-lg text-lg">Add</button>
				</label>


			</form>
		</div>
	)
}

export default AddFilm;