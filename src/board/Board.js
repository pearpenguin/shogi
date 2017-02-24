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
		this.board = [];
		for (var i = 0; i < BOARD_SIZE; i++) {
			this.board.push(null);
		}
		this.pieces = [];
		this.initBoard();
	}

	/* Initialize new game board and piece-list */
	initBoard () {
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
		})
	}

	/* Get the piece at the specified position */
	getPiece (pos) {
		return this.board[pos];
	}

	/* Put a piece at the specified position on the board */
	putPiece (piece, pos) {
		this.board[pos] = piece;
	}

	/* Check if a move will conflict with an existing piece
	 * Return true if conflict, false otherwise
	 */
	isMoveConflict (piece, pos) {
		let piece2 = this.getPiece(pos);
		//Cannot move into a position occupied by a piece of the same color
		if (piece2 && piece.color === piece2.color)
			return true;

		return false;
	}
}
