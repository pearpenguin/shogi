import { BOARD_SIZE, NUM_COLS, COLOR } from './defs';
import * as position from './position';
import King from './King';
import Gold from './Gold';
import Silver from './Silver';
import Knight from './Knight';
import Lance from './Lance';
import Bishop from './Bishop';
import Rook from './Rook';
import Pawn from './Pawn';

export default class Board {
	constructor () {
		this.clearBoard();
	}

	clearBoard () {
		this.board = [];
		for (var i = 0; i < BOARD_SIZE; i++) {
			this.board.push(null);
		}
		this.pieces = [];
		/* Captured pieces can be dropped on the board */
		this.resevoir = {};
		this.resevoir[COLOR.BLACK] = [];
		this.resevoir[COLOR.WHITE] = [];
		/* game state (current turn, turn number, player timers) */
		this.turnToAct = COLOR.BLACK;
	}

	/* Initialize new game board and piece-list */
	initBoard () {
		this.clearBoard();
		/* Init piece-list */
		/* White */
		this.pieces = [
			new Lance(COLOR.WHITE, position.toIdx(1, 'a')),
			new Knight(COLOR.WHITE, position.toIdx(2, 'a')),
			new Silver(COLOR.WHITE, position.toIdx(3, 'a')),
			new Gold(COLOR.WHITE, position.toIdx(4, 'a')),
			new King(COLOR.WHITE, position.toIdx(5, 'a')),
			new Gold(COLOR.WHITE, position.toIdx(6, 'a')),
			new Silver(COLOR.WHITE, position.toIdx(7, 'a')),
			new Knight(COLOR.WHITE, position.toIdx(8, 'a')),
			new Lance(COLOR.WHITE, position.toIdx(9, 'a')),
			new Rook(COLOR.WHITE, position.toIdx(2, 'b')),
			new Bishop(COLOR.WHITE, position.toIdx(8, 'b')),
		];
		for (let i = 1; i <= NUM_COLS; i++) {
			this.pieces.push(new Pawn(COLOR.WHITE, position.toIdx(i, 'c')));
		}
		/* Black */
		this.pieces = this.pieces.concat([
			new Lance(COLOR.BLACK, position.toIdx(1, 'i')),
			new Knight(COLOR.BLACK, position.toIdx(2, 'i')),
			new Silver(COLOR.BLACK, position.toIdx(3, 'i')),
			new Gold(COLOR.BLACK, position.toIdx(4, 'i')),
			new King(COLOR.BLACK, position.toIdx(5, 'i')),
			new Gold(COLOR.BLACK, position.toIdx(6, 'i')),
			new Silver(COLOR.BLACK, position.toIdx(7, 'i')),
			new Knight(COLOR.BLACK, position.toIdx(8, 'i')),
			new Lance(COLOR.BLACK, position.toIdx(9, 'i')),
			new Rook(COLOR.BLACK, position.toIdx(2, 'h')),
			new Bishop(COLOR.BLACK, position.toIdx(8, 'h')),
		]);
		for (let i = 1; i <= NUM_COLS; i++) {
			this.pieces.push(new Pawn(COLOR.BLACK, position.toIdx(i, 'g')));
		}

		/* Put pieces on board */
		this.pieces.forEach((piece) => {
			this.putPiece(piece, piece.pos);
		});
	}

	/* Get the board representation */
	getBoard () {
		return this.board;
	}

	/* Get the piece-list representation */
	getPieceList () {
		return this.pieces;
	}

	/* Get the piece at the specified position on the board */
	getPiece (pos) {
		return this.board[pos];
	}

	/* Put a piece at the specified position on the board. */
	putPiece (piece, pos) {
		this.board[pos] = piece;
		piece.setPos(pos);
	}

	/* Remove a piece from the specified position on the board */
	removePiece (piece) {
		let pos = piece.pos;
		if (position.isValid(pos)) {
			this.board[pos] = null;
			piece.setPos(null);
		}
	}

	/* Put a captured piece in the specified resevoir */
	putResevoir(color, piece) {
		piece.setColor(color);
		this.resevoir[color].push(piece);
	}

	getResevoir(color) {
		return this.resevoir[color];
	}

	/* Check if a move will conflict with an existing piece and is inbounds
	 * Return true if valid, false otherwise
	 */
	isValidMove (piece, pos) {
		if (!position.isValid(pos))
			return false;

		let piece2 = this.getPiece(pos);
		//Cannot move into a position occupied by a piece of the same color
		if (piece2 && piece.color === piece2.color)
			return false;

		return true;
	}

	/* End the turn for the current player */
	endTurn () {
		this.turnToAct = (this.turnToAct === COLOR.BLACK) ? 
			COLOR.WHITE : COLOR.BLACK;
	}

	/* Move a piece to a new position */
	move (piece, pos) {
		if (piece.getLegalMoves(this).indexOf(pos) === -1) {
			return false;
		}
		else {
			/* If destination is occupied, capture the piece */
			let destPiece = this.getPiece(pos);
			if (destPiece) {
				this.capture(piece, destPiece);
			}

			this.removePiece(piece);
			this.putPiece(piece, pos);

			return true;
		}
	}

	/* Capture the specified piece (removes it from the board and
	 * places it in capturing color's resevoir) */
	capture (taker, taken) {
		this.removePiece(taken);
		/* Put it in the taking player's resevoir */
		this.putResevoir(taker.color, taken);
	}
}
