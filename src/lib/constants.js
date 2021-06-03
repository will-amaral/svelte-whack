export const TIME_LIMIT = 30000;
export const MOLE_SCORE = 100;
export const POINTS_MULTIPLIER = 0.9;
export const TIME_MULTIPLIER = 1.25;
export const NUMBER_OF_MOLES = 5;
export const generateMoles = (amount, initialPoints, random) =>
	new Array(amount).fill().map((_, index) => ({
		id: index,
		duration: random(0.5, 1),
		delay: random(0.5, 4),
		initialPoints
	}));
