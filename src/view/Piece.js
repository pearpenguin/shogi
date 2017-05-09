import m from 'mithril';
// import { NUM_COLS, BOARD_SIZE, COLOR } from '../board/defs';
import '../css/board.scss';

export default {
	view (vnode) {
		let piece = vnode.attrs.piece;
		let pieceName = piece.toString();
		return m('div.board__piece', pieceName);
	}
};
