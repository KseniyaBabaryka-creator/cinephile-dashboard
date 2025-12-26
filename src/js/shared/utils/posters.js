const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;

export const getPoster = async (title) => {
	if (!title) return null;

	const response = await fetch(
		`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}`,
		{
			headers: {
				Authorization: `Bearer ${TMDB_KEY}`,
				'Content-Type': 'application/json',
			},
		}
	);

	if (!response.ok) return null;

	const data = await response.json();

	const posterPath = data?.results?.[0]?.poster_path;

	return posterPath
		? `https://image.tmdb.org/t/p/w500${posterPath}`
		: null;
};
