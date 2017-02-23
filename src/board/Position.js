import {BOARD_SIZE, NUM_COLS} from './defs';

/* Represents a position on the board 
 * Following Shogi board notation:
 *  north -> south == a -> i
 *  east -> west == 1 -> 9
 */
export default class Position {
	constructor(pos = 0) {
		if (!this.constructor.checkLimits(pos))
			throw new Error('Position is outside the board');

		this.pos = pos; //Index in the board array
	}

	static checkLimits(pos) {
		if (pos < 0 || pos >= BOARD_SIZE)
			return false;

		return true;
	}

	/* Returns a new position relative to this position. 
	 * Return null if outside the board */
	north() {
		let pos = this.pos - NUM_COLS;
		if (this.constructor.checkLimits(pos))
			return new Position(pos);

		return null;
	}

	south() {
		let pos = this.pos + NUM_COLS;
		if (this.constructor.checkLimits(pos))
			return new Position(pos);

		return null;
	}

	east() {
		//Cannot move east if we are on the east-most column
		if (this.pos % NUM_COLS === 0)
			return null;

		return new Position(this.pos - 1);
	}

	west() {
		let pos = this.pos + 1;
		//Cannot have moved west if we ended up on the east-most column
		if (pos % NUM_COLS === 0)
			return null;

		return new Position(pos);
	}

	northwest() {
		let pos;
		if (pos = this.north())
			return pos.west();
		return null;
	}

	northeast() {
		let pos;
		if (pos = this.north())
			return pos.east();
		return null;
	}

	southwest() {
		let pos;
		if (pos = this.south())
			return pos.west();
		return null;
	}

	southeast() {
		let pos;
		if (pos = this.south())
			return pos.east();
		return null;
	}
}