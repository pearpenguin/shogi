import Piece from './Piece';
import { DIR } from './defs';

export default class Silver extends Piece {
	/* Silver can move 1 square in any direction except left, right, and down*/
	getLegalMoves (board) {
		let directions = [
			DIR.UP, DIR.UPRIGHT, DIR.UPLEFT, DIR.DOWNRIGHT, DIR.DOWNLEFT
		];

		return this.computeLegalMoves(board, directions);
	}
}
