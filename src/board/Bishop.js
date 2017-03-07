import Piece from './Piece';
import { DIR, INFINITE } from './defs';

export default class Bishop extends Piece {

	/* Moves like a bishop in Western chess */
	getLegalMoves (board) {
		let directions = [ DIR.UPLEFT, DIR.UPRIGHT, DIR.DOWNLEFT, DIR.DOWNRIGHT ];
		return this.computeLegalMoves(board, directions, INFINITE);
	}

	toString () {
		return 'Bishop';
	}
}