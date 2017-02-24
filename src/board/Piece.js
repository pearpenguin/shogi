import { COLOR, DIR } from './defs';
import * as position from './position';

export default class Piece {
	constructor (color, pos = null) {
		if (color !== COLOR.BLACK && color !== COLOR.WHITE)
			throw new Error('Piece color must be BLACK or WHITE');

		this.color = color;
		this.pos = pos;
		this.isPromoted = false;
	}

	/* Resolve a direction into a new position based on this piece's color */
	getNewPosition (pos, direction) {
		if (pos) {
			if (this.color === COLOR.BLACK) {
				switch (direction) {
					case DIR.UP:
						return position.north(pos);
					case DIR.DOWN:
						return position.south(pos);
					case DIR.LEFT:
						return position.west(pos);
					case DIR.RIGHT:
						return position.east(pos);
					case DIR.UPRIGHT:
						return position.northeast(pos);
					case DIR.UPLEFT:
						return position.northwest(pos);
					case DIR.DOWNRIGHT:
						return position.southeast(pos);
					case DIR.DOWNLEFT:
						return position.southwest(pos);
					default:
						throw new Error('Invalid direction');
				}
			}
			//White
			else {
				switch (direction) {
					case DIR.UP:
						return position.south(pos);
					case DIR.DOWN:
						return position.north(pos);
					case DIR.LEFT:
						return position.east(pos);
					case DIR.RIGHT:
						return position.west(pos);
					case DIR.UPRIGHT:
						return position.southwest(pos);
					case DIR.UPLEFT:
						return position.southeast(pos);
					case DIR.DOWNRIGHT:
						return position.northwest(pos);
					case DIR.DOWNLEFT:
						return position.northeast(pos);
					default:
						throw new Error('Invalid direction');
				}
			}
		}
		return null;
	}
	/* Check if moving in the specified direction is valid
	 * Return the new Position if valid, null if not
	 */
	peek (board, pos, direction) {
		let newPos = this.getNewPosition(pos, direction);
		//Check if position is inbounds and if one of our own pieces occupy the new position
		if (position.isValid(newPos) && !board.isMoveConflict(this, newPos)) {
			return newPos;
		}
		return null;
	}

	/* Abstract function. Rules to be implemented by specific pieces 
	 * Return an array of legal board indexes */
	/*
	getLegalMoves (board) {
	}
	*/
}