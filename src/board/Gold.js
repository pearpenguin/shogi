import Piece from './Piece';
import { DIR } from './defs';

export default class Gold extends Piece {

	/* Gold can move 1 square in any direction except for downleft and downright */
	getLegalMoves (board) {
		let directions = [
			DIR.UP, DIR.DOWN, DIR.LEFT, DIR.RIGHT, 
			DIR.UPRIGHT, DIR.UPLEFT
		];

		return this.computeLegalMoves(board, directions);
	}
}