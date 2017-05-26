import _ from 'underscore';
import { BOARD_SIZE, NUM_COLS, COLOR } from './defs';
import * as position from './position';
import * as utils from '../utils/utils';
import Piece from './Piece';
import King from './King';
import Gold from './Gold';
import Silver from './Silver';
import Knight from './Knight';
import Lance from './Lance';
import Bishop from './Bishop';
import Rook from './Rook';
import Pawn from './Pawn';

/* Swap from black to white and vice versa */
function swapColor(color) {
	return (color === COLOR.BLACK) ? COLOR.WHITE : COLOR.BLACK;
}

export default class Board {
	constructor () {
		this.clearBoard();
	}

	clearBoard () {
		this.board = utils.createArray(BOARD_SIZE);
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

	clone () {
		let clone = new Board();
		clone.board = this.getBoard().slice();
		clone.pieces = this.getPieceList().slice();
		for (let c in COLOR) {
			clone.resevoir[COLOR[c]] = _.clone(this.resevoir[COLOR[c]]);
		}
		clone.turnToAct = this.turnToAct;
		return clone;
	}

	/* Get the board representation */
	getBoard () {
		return this.board;
	}

	/* Return a filtered array of the specified column (idx from 0) */
	getColumn (colIdx) {
		return this.board.filter((e, idx) => {
			return position.toCol(idx) === colIdx;
		});
	}

	/* Add a new piece to the piecelist and put it in position if applicable */
	addPiece (piece) {
		if (!(piece instanceof Piece)) {
			throw new Error('Trying to add a non-piece');
		}
		this.pieces.push(piece);
		if (piece.pos) {
			this.putPiece(piece, piece.pos);
		}
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

	/* Remove a piece from the board */
	removePiece (piece) {
		let pos = piece.pos;
		if (position.isValid(pos)) {
			this.board[pos] = null;
			piece.setPos(null);
			piece.reset();
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

	/* Iterate through the specified pieces and work out where they're attacking.
	 * Returns an array of the board, each element is a list of pieces attacking
	 * that square */
	computeAttack (pieces) {
		let attackedSquares = utils.createDblArray(BOARD_SIZE);
		pieces.forEach((piece) => {
			if (!(piece instanceof Piece)) {
				throw new Error('computeAttack needs a Piece');
			}
			let moves = piece.getLegalMoves(this);
			moves.forEach((idx) => {
				attackedSquares[idx].push(piece);
			});
		});
		return attackedSquares;
	}

	/* Iterate through all the pieces of the specified color
	 * and work out where they're attacking. */
	computeAttackFromColor (color) {
		return this.computeAttack(this.getPieceList().filter((piece) => {
			return piece.color === color;	
		}));
	}

	/* End the turn for the current player */
	endTurn () {
		this.turnToAct = (this.turnToAct === COLOR.BLACK) ? 
			COLOR.WHITE : COLOR.BLACK;
	}

	/* Move a piece to a new position */
	move (piece, pos) {
		if (!piece.isLegalMove(this, pos)) {
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

			/* Piece must be promoted if no more legal moves can be made
			 * and we are in the promotion zone */
			if (!piece.hasLegalMoves(this) && piece.inPromotionZone()) {
				piece.promote();
			}

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

	isPawnInCol (colIdx) {
		let col = this.getColumn(colIdx);
		return col.some((piece) => {
			return piece instanceof Pawn;
		});
	}

	/* Returns an array of the pieces which are attacking the king */
	getCheckingPieces (king) {
		if (!(king instanceof King))
			throw new Error('Need King to caltulate check');

		/* Check if the King is being attacked */
		/* Work out which squares are being attacked by opponent pieces */
		return this.computeAttackFromColor(swapColor(king.color))[king.pos];
	}

	/* Return true if the specified king is under check, false otherwise */
	isCheck (king) {
		return this.getCheckingPieces(king).length !== 0;
	}

	/* Work out if the specified piece has been checkmated
	 * Use only for drop pawn mate checks */
	isCheckmate (king) {
		if (!(king instanceof King))
			throw new Error('Need King to calculate checkmate');

		/* Copy the board state so we can play around with it */
		let b = this.clone();
		let enemyColor = swapColor(king.color);
		let oldKingPos = king.pos;
		king = b.getPiece(oldKingPos); /* Reference cloned king */

		let kingAttackers = b.getCheckingPieces(king);
		if (kingAttackers.length === 0) {
			return false;
		}

		/* First work out if King has any legal moves (including captures)
		 * Check each legal move to see if the square is being attacked.
		 * If a square is not being attacked, then the King can move there
		 * and therefore it is not checkmate */
		let kingMoves = king.getLegalMoves(this);
		for (let i in kingMoves) {
			let move = kingMoves[i];
			/* If there is already a piece there, save it */
			let piece = b.getPiece(move);
			b.removePiece(king);
			b.putPiece(king, move);
			/* Recompute attacked squares */
			if (b.getCheckingPieces(king).length === 0) {
				return false;
			}
			/* Restore pieces */
			b.removePiece(king);
			b.putPiece(king, oldKingPos);
			if (piece) {
				b.putPiece(piece, move);
			}
		}

		/* We've worked out that the King cannot dodge.
		 * If there is more than one attacking piece, it is checkmate */
		if (kingAttackers.length > 1) {
			return true;
		}

		/* If there is only one attacking piece, work out whether we can capture
		 * it using a piece other than our king, while keeping the King's square unattacked */
		let counterAtks = b.computeAttackFromColor(king.color)[kingAttackers[0].pos];
		for (let i in counterAtks) {
			let piece = counterAtks[i];
			if (piece instanceof King) {
				/* We've already determined that the King cannot move */
				continue;
			}
			b.capture(piece, kingAttackers[0]);
			/* See if there were any attackers pinning the countering piece
			 * to the King */
			let pin = b.computeAttack(attackers[piece.pos]);
			if (pin[oldKingPos].length === 0) {
				return false;
			}
		}

		/* TODO: work out whether we can block the attacker, either with a piece move
		 * or a drop. Not required to check drop pawn mate */

		/* Cannot avoid checkmate */
		return true;
	}

	/* If piece is a pawn, special drop rules must be checked */
	isPawnDropLegal (piece) {
		if (!(piece instanceof Pawn)) {
			throw new Error('Trying to check pawn drop on a non-pawn unit');
		}

		/* Cannot drop on a column which already has an 
		 * unpromoted pawn owned by yourself */
		if (this.isPawnInCol(piece.getCol())) {
			return false;
		}

		/* Cannot checkmate opponent's King with pawn drop */
		let moves = piece.getLegalMoves(this);
		if (moves.length) {
			/* Can assume Pawn only attacks one space in front of it */
			let attackedPiece = this.getPiece(moves.pop());
			if (attackedPiece instanceof King) {
				if (this.isCheckmate(attackedPiece)) {
					return false;
				}
			}
		}

		return true;
	}

	isDropLegal (piece) {
		/* Piece can only be dropped if it has a legal move */
		if (!piece.hasLegalMoves(this)) {
			return false;
		}
		/* Check special drop rules if piece is a Pawn */
		if (piece instanceof Pawn && !this.isPawnDropLegal(piece)) {
			return false;
		}

	}

	/* Drop a piece from resevoir to the board */
	drop (piece, pos) {
		this.putPiece(piece, pos);
		if (this.isDropLegal(piece)) {
			this.removePiece(piece);
			this.putResevoir(piece.color, piece);
			return false;
		}
		return true;

	}
}
