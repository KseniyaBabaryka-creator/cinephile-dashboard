/**
 * Films store
 * Acts as single source of truth for watched films
 */

import { create } from 'zustand';
import {films as initialFilms} from "../mock/films.js";

const useFilmStore = create((set) => ({
	films: initialFilms,

	setFilms: (newFilms) => set({ films: newFilms}),

	addFilm: (newFilm) => set((state) => ({
		films: [
			{
				id: state.films.length + 1,
				...newFilm,
			},
			...state.films,
		]
	})),

	removeFilm: (id) => set((state) => ({
		films: state.films.filter(film => film.id !== id)
	})),

	updateFilm: (updatedFilm) => set((state) => ({
		films: state.films.map((film) =>
			film.id === updatedFilm.id
				? { ...film, ...updatedFilm }
				: film
		),
	}))
}));

export default useFilmStore;