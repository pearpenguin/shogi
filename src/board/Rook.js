import Piece from './Piece';
import { DIR, INFINITE } from './defs';

export default class Rook extends Piece {

	/* Moves like a rook in Western chess */
	getLegalMoves (board) {
		let directions = [ DIR.UP, DIR.LEFT, DIR.RIGHT, DIR.DOWN ];
		return this.computeLegalMoves(board, directions, INFINITE);
	}

	toString () {
		return 'Rook';
	}
}
