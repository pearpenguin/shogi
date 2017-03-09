import Piece from './Piece';
import { DIR, INFINITE } from './defs';

export default class Rook extends Piece {

	isPromotable () {
		return true;
	}
	
	/* Moves like a rook in Western chess */
	getLegalMoves (board) {
		let directions = [ DIR.UP, DIR.LEFT, DIR.RIGHT, DIR.DOWN ];
		let moves = this.computeLegalMoves(board, directions, INFINITE);

		/* Promoted rook can also move like a King */
		if (this.isPromoted) {
			directions = [ DIR.UPLEFT, DIR.UPRIGHT, DIR.DOWNLEFT, DIR.DOWNRIGHT ];
			moves = moves.concat(this.computeLegalMoves(board, directions));
		}
		return moves;
	}

	toString () {
		return 'Rook';
	}
}
