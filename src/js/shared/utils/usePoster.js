import { useState, useEffect } from 'react';
import { getPoster } from './posters';

export function usePoster(title) {
	const [poster, setPoster] = useState(null);

	useEffect(() => {
		if (!title) return;
		let isCancelled = false;

		getPoster(title).then((url) => {
			if (!isCancelled) setPoster(url);
		});

		return () => {
			isCancelled = true;
		};
	}, [title]);

	return poster;
}
