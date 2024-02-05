export const formatStars = (stars: number): string => {
	if(stars >= 1000) {
		const convertStars = Math.round(stars / 100) / 10;
		
		return `${convertStars}k`;
	} else {
		return `${stars}`;
	}
};


export const convertDate = (date: Date): string => {
	const inputDate: Date = new Date(date);
	const months: string[] = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
	const day: number = inputDate.getUTCDate();
	const month: string = months[inputDate.getUTCMonth()];
	const year: number = inputDate.getUTCFullYear();
	
	return `${day} ${month}. ${year} г.`;
};