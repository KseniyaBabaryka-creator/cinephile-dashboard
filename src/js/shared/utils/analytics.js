export function getMostFrequent(items) {
	return Object.entries(
		items.reduce((acc, item) => {
			acc[item] = (acc[item] || 0) + 1;
			return acc;
		}, {})
	).reduce(
		(best, [key, count]) => count > best.count ? { key, count } : best,
		{ key: null, count: 0 }
	).key;
}

export function getAverageRating(items) {
	return items.length > 0
		? items.reduce((sum, film) => sum + film.rating, 0) / items.length
		: 0;
}