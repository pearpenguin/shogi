import {BOARD_SIZE, NUM_COLS, NUM_ROWS } from './defs';

/* Functions to check movement on the board
 * Following Shogi board notation:
 *  north -> south == a -> i
 *  east -> west == 1 -> 9
 */
export function toIdx (col, rowChar) {
	//Convert to row/col index
	//Row a = idx 0, b = 1, ...
	//Col 1 = idx 0, ...
	let row = rowChar.charCodeAt() - 97; //ASCII a = 97
	col -= 1;
	if (col < 0 || col >= NUM_COLS || row < 0 || row >= NUM_ROWS) {
		throw new Error(`Invalid position notation '${col}${rowChar}'`);
	}
	return row * NUM_COLS + col;
}

/* Convert a board index to a zero-based column number.
 *  east -> west == 0 -> 8 */
export function toCol (idx) {
	/* Get the remainder of idx divided by number of columns */
	return idx % NUM_COLS;
}

/* Convert a board index to a zero-based row number 
 *  north -> south == 0 -> 8 */
export function toRow (idx) {
	/* Get the quotient of idx divided by number of columns */
	return Math.foor(idx/NUM_COLS);
}

export function isValid(pos) {
	if (typeof(pos) === 'number' && pos >= 0 && pos < BOARD_SIZE)
		return true;

	return false;
}

/* Returns a new position index relative to the given position. 
 * Return null if outside the board */
export function north(pos) {
	if (!isValid(pos))
		return null;

	pos -= NUM_COLS;
	if (isValid(pos))
		return pos;

	return null;
}

export function south(pos) {
	if (!isValid(pos))
		return null;

	pos = pos + NUM_COLS;
	if (isValid(pos))
		return pos;

	return null;
}

export function east(pos) {
	if (!isValid(pos))
		return null;

	//Cannot move east if we are on the east-most column
	if (pos % NUM_COLS === 0)
		return null;

	return pos - 1;
}

export function west(pos) {
	if (!isValid(pos))
		return null;

	pos = pos + 1;
	//Cannot have moved west if we ended up on the east-most column
	if (pos % NUM_COLS === 0)
		return null;

	return pos;
}

export function northwest(pos) {
	return west(north(pos));
}

export function northeast(pos) {
	return east(north(pos));
}

export function southwest(pos) {
	return west(south(pos));
}

export function southeast(pos) {
	return east(south(pos));
}
