import Piece from './Piece';
import { DIR } from './defs';

export default class Knight extends Piece {

	isPromotable () {
		return true;
	}
	
	/* Moves like Knight in Western chess */
	getLegalMoves (board) {
		/* Promoted Knight moves like a Gold */
		if (this.isPromoted) {
			return this.computeLegalMoves(board, Gold.getDirections());
		}
		else {
			let moves = [
				this.getNewPosition(this.getNewPosition(this.pos, DIR.UPRIGHT), DIR.UP),
				this.getNewPosition(this.getNewPosition(this.pos, DIR.UPLEFT), DIR.UP)
			];

			return moves.filter((move) => {
				return board.isValidMove(this, move);
			});
		}
	}

	toString () {
		return 'Knight';
	}
}
