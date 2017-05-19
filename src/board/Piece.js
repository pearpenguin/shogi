import { COLOR, DIR, INFINITE, NUM_COLS, NUM_ROWS, BOARD_SIZE } from './defs';
import * as position from './position';

/* Abstract class, do not instantiate */
export default class Piece {
	constructor (color, pos = null) {
		this.reset();
		this.setColor(color);
		this.setPos(pos);
	}

	/* Reset a piece to demoted status */
	reset () {
		this.isPromoted = false;
	}

	/* Abstract getter to determine whether a piece is promotable
	isPromotable ()
	*/

	/* Get valid promotion squares for this piece */
	getPromotionSquares () {
		let validSquares = [];
		/* Can only promote on the last 3 rows */
		for (let i = 0; i < NUM_COLS * 3; i++) {
			validSquares.push(i);
		}
		/* Opposite side for white piece */
		if (this.isWhite()) {
			validSquares = validSquares.map((pos) => {
				return BOARD_SIZE - 1 - pos;
			});
		}
		return validSquares;
	}

	inPromotionZone () {
		return this.getPromotionSquares().indexOf(this.pos) !== -1;
	}

	/* Promote a piece in the current position if possible */
	promote () {
		if (this.isPromotable() && !this.isPromoted) {
			/* Check if we are in the promotion zone */
			if (this.inPromotionZone()) {
				this.isPromoted = true;
				return true;
			}	
		}
		return false;
	}

	/* Return the column this piece is on (zero-based) */
	getCol () {
		return position.toCol(this.pos);
	}

	/* Return the row this piece is on (zero-based) */
	getRow () {
		return position.toRow(this.pos);
	}

	setPos (pos = null) {
		this.pos = pos;
	}

	setColor (color) {
		if (color !== COLOR.BLACK && color !== COLOR.WHITE)
			throw new Error('Piece color must be BLACK or WHITE');
		this.color = color;
	}

	isBlack () {
		return this.color === COLOR.BLACK;
	}

	isWhite () {
		return this.color === COLOR.WHITE;
	}

	/* Resolve a direction into a new position based on this piece's color */
	getNewPosition (pos, direction) {
		if (position.isValid(pos)) {
			if (this.isBlack()) {
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
					/* If opponent piece is in the new position, stop peeking this direction*/
					let piece = board.getPiece(pos);
					if (piece && piece.color !== this.color) {
						break;
					}
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

	isLegalMove (board, pos) {
		return this.getLegalMoves(board).indexOf(pos) !== -1;
	}

	hasLegalMoves (board) {
		return this.getLegalMoves(board).length !== 0;
	}
}