import {Controller, useForm} from "react-hook-form"
import Select from 'react-select';
import {allFilmGenres} from "../../shared/mock/genres.js";
import useFilmStore from "../../shared/store/useFilmStore.js";
import {useNavigate} from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import {useState} from "react";

function AddFilm() {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();

	const addFilm = useFilmStore(state => state.addFilm);
	const notify = () => toast('🎬  Film added to your diary');
	const navigate = useNavigate();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = (data) => {
		if (Object.keys(errors).length > 0) {
			return;
		}

		setIsSubmitting(true);

		const newFilm = {
			title: data.title.trim(),
			year: data.year?.value ?? null,
			director: data.director?.trim() || null,
			genres: data.genres?.map(g => g.value) ?? [],
			mood: data.mood?.value ?? null,
			rating: data.rating?.value ?? null,
			notes: data.notes?.trim() || null,
			dateWatched: data.dateWatched,
		};

		addFilm(newFilm);
		notify();
		setIsSubmitting(false);
		setTimeout(() => {
			navigate('/');
		}, 1200);

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
			backgroundColor: '#1C1C1F',
			borderColor: isFocused ? '#6D2C2C' : '#FFFFFF0F',
			borderRadius: '12px',
			boxShadow: 'none',
			'&:hover': {
				borderColor: '#6D2C2C',
			},
			minHeight: '42px',
			color: '#F5F5F5'
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
			color: '#A1A1A1',
		}),

		singleValue: (styles) => ({
			...styles,
			color: '#A1A1A1',
		}),
	};

	return (
		<div className="card form__card flex flex-col items-start gap-6 w-[60%] m-auto mt-12 rounded-lg p-6">
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
			<h2 className="text-xl italic font-medium">Describe your most recent experience...</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10  w-full max-w-[720px]">
				<div className="flex flex-col gap-4 w-full mt-4">
					<div className="flex flex-col gap-4">
						<h4 className="text-sm uppercase tracking-widest text-center text-[var(--color-text-muted)]">
							Emotional State
						</h4>
						<div className="flex flex-wrap items-center justify-between">
							<label className="form__label flex-1 max-w-[300px] min-w-[200px] grid gap-2 text-base items-start mb-4">
								Your Mood
								<Controller
									name="mood"
									control={control}
									defaultValue={null}
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

							<label className="form__label flex-1 max-w-[300px] min-w-[200px] grid gap-2 text-base items-start mb-4">
								Give it a rate
								<Controller
									name="rating"
									required="true"
									control={control}
									defaultValue={null}
									render={({ field }) => (
										<Select
											{...field}
											options={rates}
											styles={colourStyles}
											classNamePrefix="select"
											placeholder="Give it a rate"
										/>
									)}
								/>
							</label>
						</div>
					</div>

					<div className="flex flex-col gap-4">
						<h4 className="text-sm uppercase tracking-widest text-center text-[var(--color-text-muted)]">
							Film
						</h4>
						<label className="form__label grid gap-2 text-base items-start mb-4">
							Title
							<input
								{...register("title", { required: true })}
								className="form__input rounded-xl p-1 w-full border-2 border-solid font-medium text-lg"
								placeholder="Title"
							/>
							{errors.title && <span className="text-xs text-(--color-accent-primary)">This field is required</span>}
						</label>
						<label className="form__label grid gap-2 text-base items-start mb-4">
							Director
							<input
								{...register("director")}
								className="form__input rounded-xl p-1 w-full border-2 border-solid font-medium text-lg"
								placeholder="Director"
							/>
						</label>
						<div className="flex flex-wrap items-center justify-between">
							<label className="form__label flex-1 min-w-[200px] max-w-[300px] grid gap-2 text-base items-start mb-4">
								Date Watched
								<input
									type="date"
									{...register("dateWatched", { required: true })}
									className="form__input rounded-xl p-1 w-full border-2 border-solid font-medium text-lg"
								/>
								{errors.dateWatched && <span className="text-xs text-(--color-accent-primary)">This field is required</span>}
							</label>

							<label className="form__label flex-1 min-w-[200px] max-w-[300px] grid gap-2 text-base items-start mb-4">
								Year of Production
								<Controller
									name="year"
									control={control}
									defaultValue={null}
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
						</div>
					</div>

					<div className="flex flex-col gap-4">
						<h4 className="text-sm uppercase tracking-widest text-center text-[var(--color-text-muted)]">
							Reflection
						</h4>
						<label className="form__label grid gap-2 text-base items-start mb-4">
							Notes
							<textarea
								{...register("notes")}
								placeholder="Write your thoughts about the film..."
								rows={5}
								className="form__input-textarea rounded-xl p-3 w-full  border resize-none focus:border-[#6D2C2C] focus:outline-none"
							/>
						</label>

						<label className="form__label grid gap-2 text-base items-start mb-4">
							Genres
							<Controller
								name="genres"
								control={control}
								defaultValue={null}
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
					</div>

					<label className="form__label grid gap-2 text-base items-start mb-4">
						<button type="submit" className="form__btn rounded-lg text-lg mt-[24px]" disabled={isSubmitting}>
							{isSubmitting ? 'Saving...' : 'Save to Diary'}
						</button>
					</label>
				</div>
			</form>
		</div>
	)
}

export default AddFilm;