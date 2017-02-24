import Piece from './Piece';
import * as position from './position';
import { DIR } from './defs';

export default class King extends Piece {
	
	/* King can move 1 square in any direction */
	getLegalMoves (board) {
		let directions = [
			DIR.UP, DIR.DOWN, DIR.LEFT, DIR.RIGHT, 
			DIR.UPRIGHT, DIR.UPLEFT, DIR.DOWNRIGHT, DIR.DOWNLEFT
		];

		let legalMoves = directions.reduce((moves, dir) => {
			let pos = this.peek(board, this.pos, dir);
			if (position.isValid(pos)) {
				moves.push(pos);
			}
			return moves;
		}, [])

		return legalMoves;
	}
}