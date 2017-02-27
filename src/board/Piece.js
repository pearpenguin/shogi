import { COLOR, DIR, INFINITE, NUM_COLS, NUM_ROWS } from './defs';
import * as position from './position';

export default class Piece {
	constructor (color, pos = null) {
		this.setColor(color);
		this.setPos(pos);
		this.isPromoted = false;
	}

	setPos (pos = null) {
		this.pos = pos;
	}

	setColor (color) {
		if (color !== COLOR.BLACK && color !== COLOR.WHITE)
			throw new Error('Piece color must be BLACK or WHITE');
		this.color = color;
	}

	/* Resolve a direction into a new position based on this piece's color */
	getNewPosition (pos, direction) {
		if (position.isValid(pos)) {
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
		if (board.isValidMove(this, newPos)) {
			return newPos;
		}
		return null;
	}

	/* Return an array of all legal moves, given directions and
	 * the maximum number of steps it can move. maxSteps of infinite goes to the edge */
	computeLegalMoves(board, directions, maxSteps = 1) {
		let steps;
		let pos;
		let legalMoves = directions.reduce((moves, dir) => {
			if (maxSteps === INFINITE)
				steps = NUM_COLS > NUM_ROWS ? NUM_COLS : NUM_ROWS;
			else
				steps = maxSteps;
			pos = this.pos;
			// Iteratively peek until maxSteps achieved or invalid move reached
			while (steps > 0) {
				steps--;
				pos = this.peek(board, pos, dir);
				if (position.isValid(pos)) {
					moves.push(pos);
				}
				else {
					break;
				}
			}
			return moves;
		}, []);
		return legalMoves;
	}

	/* Abstract function. Rules to be implemented by specific pieces 
	 * Return an array of legal board indexes */
	/*
	getLegalMoves (board) {
	}
	*/
}