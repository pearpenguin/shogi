import Piece from './Piece';
import { DIR } from './defs';

export default class Pawn extends Piece {

	isPromotable () {
		return true;
	}
	
	/* Pawn can only move up */
	getLegalMoves (board) {
		let directions;
		/* Promoted Pawn moves like a Gold */
		if (this.isPromoted) {
			directions = Gold.getDirections();
		}
		else {
			directions = [DIR.UP];
		}

		return this.computeLegalMoves(board, directions);
	}

	toString () {
		return 'Pawn';
	}
}
