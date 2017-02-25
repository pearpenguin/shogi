import Piece from './Piece';
import { DIR } from './defs';

export default class Knight extends Piece {

	/* Moves like Knight in Western chess */
	getLegalMoves (board) {
		let moves = [
			this.getNewPosition(this.getNewPosition(this.pos, DIR.UPRIGHT), DIR.UP),
			this.getNewPosition(this.getNewPosition(this.pos, DIR.UPLEFT), DIR.UP)
		];

		return moves.filter((move) => {
			return board.isValidMove(this, move);
		});
	}
}
