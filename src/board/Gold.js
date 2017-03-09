import Piece from './Piece';
import { DIR } from './defs';

export default class Gold extends Piece {

	isPromotable () {
		return false;
	}

	/* Gold can move 1 square in any direction except for downleft and downright */
	static getDirections () {
		return [
			DIR.UP, DIR.DOWN, DIR.LEFT, DIR.RIGHT, 
			DIR.UPRIGHT, DIR.UPLEFT
		];
	}
	
	getLegalMoves (board) {
		return this.computeLegalMoves(board, Gold.getDirections());
	}

	toString () {
		return 'Gold';
	}
}