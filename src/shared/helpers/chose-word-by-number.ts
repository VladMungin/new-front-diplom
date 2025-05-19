export function chooseWordByNumber(num: number, words: string[]) {
	if (num <= 1) {
		return words[0];
	} else if (num > 1 && num < 5) {
		return words[1];
	} else {
		return words[2];
	}
}
