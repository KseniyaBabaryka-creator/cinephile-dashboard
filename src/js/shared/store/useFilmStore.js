/**
 * Films store
 * Acts as single source of truth for watched films
 */

import { create } from 'zustand';
import {films as initialFilms} from "../mock/films.js";
import {persist} from "zustand/middleware";

const useFilmStore = create(
	persist(
		(set) => ({
			films: initialFilms,

			setFilms: (newFilms) => set({ films: newFilms}),

			addFilm: (newFilm) => set((state) => ({
				films: [
					{
						id: crypto.randomUUID(),
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
		}),
		{
			name: 'cinephile-films-store',
			partialize: (state) => ({ films: state.films }),
		}
		)
	);

export default useFilmStore;