import Piece from './Piece';
import Gold from './Gold';
import { DIR, INFINITE } from './defs';

export default class Lance extends Piece {

	isPromotable () {
		return true;
	}
	
	/* Moves any number of steps UP */
	getLegalMoves (board) {
		/* Promoted Lance moves like a Gold */
		if (this.isPromoted) {
			return this.computeLegalMoves(board, Gold.getDirections());
		}
		else {
			return this.computeLegalMoves(board, [ DIR.UP ], INFINITE);	
		}
	}

	toString () {
		return 'Lance';
	}
}
