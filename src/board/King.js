import Piece from './Piece';
import { DIR } from './defs';

export default class King extends Piece {

	isPromotable () {
		return false;
	}
	
	/* King can move 1 square in any direction */
	getLegalMoves (board) {
		let directions = [
			DIR.UP, DIR.DOWN, DIR.LEFT, DIR.RIGHT, 
			DIR.UPRIGHT, DIR.UPLEFT, DIR.DOWNRIGHT, DIR.DOWNLEFT
		];

		return this.computeLegalMoves(board, directions);
	}

	toString () {
		return 'King';
	}
}