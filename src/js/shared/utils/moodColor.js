export const getFallbackGradient = (mood) => {
	const gradients = {
		Claustrophobic: 'linear-gradient(135deg, #3A1C1C, #1B0F14)',
		Tense:           'linear-gradient(135deg, #4A1F2F, #1C0D15)',
		Introspective:   'linear-gradient(135deg, #1E2A3A, #0E1621)',
		Playful:         'linear-gradient(135deg, #2B3F2F, #14251A)',
		Cheerful:        'linear-gradient(135deg, #4A3A1C, #2A1F0F)',
		Magical:         'linear-gradient(135deg, #3B2A4A, #1A0F2A)',
	};

	return gradients[mood] || 'linear-gradient(135deg, #2A2A2A, #111)';
};

export const getMoodColor = (mood) => {
	const colors = {
		Claustrophobic: '#3A1C1C',
		Tense:           '#4A1F2F',
		Introspective:   '#1E2A3A',
		Playful:         '#2B3F2F',
		Cheerful:        '#4A3A1C',
		Magical:         '#3B2A4A',
	};

	return colors[mood] || '#55142587';
}