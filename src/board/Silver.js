import Piece from './Piece';
import Gold from './Gold';
import { DIR } from './defs';

export default class Silver extends Piece {

	isPromotable () {
		return true;
	}
	
	/* Silver can move 1 square in any direction except left, right, and down */
	getLegalMoves (board) {
		let directions;
		/* Promoted silver moves like a Gold */
		if (this.isPromoted) {
			directions = Gold.getDirections();
		}
		else {
			directions = [
				DIR.UP, DIR.UPRIGHT, DIR.UPLEFT, DIR.DOWNRIGHT, DIR.DOWNLEFT
			];
		} 

		return this.computeLegalMoves(board, directions);
	}

	toString () {
		return 'Silver';
	}
}
