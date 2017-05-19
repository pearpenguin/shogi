/* Create an array of specified length */
export function createArray (len) {
	let arr = [];
	for (let i = 0; i < len; i++) {
		arr.push(null);
	}
	return arr;
}

/* Create an array of arrays */
export function createDblArray (len) {
	let arr = [];
	for (let i = 0; i < len; i++) {
		arr.push([]);
	}
	return arr;
}