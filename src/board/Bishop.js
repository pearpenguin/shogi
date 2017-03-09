import Piece from './Piece';
import { DIR, INFINITE } from './defs';

export default class Bishop extends Piece {

	isPromotable () {
		return true;
	}
	
	/* Moves like a bishop in Western chess */
	getLegalMoves (board) {
		let directions = [ DIR.UPLEFT, DIR.UPRIGHT, DIR.DOWNLEFT, DIR.DOWNRIGHT ];
		let moves = this.computeLegalMoves(board, directions, INFINITE);

		/* Promoted bishop can also move like a King */
		if (this.isPromoted) {
			directions = [ DIR.UP, DIR.RIGHT, DIR.DOWN, DIR.LEFT ];
			moves = moves.concat(this.computeLegalMoves(board, directions));
		}
		return moves;
	}

	toString () {
		return 'Bishop';
	}
}