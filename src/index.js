import Board from './view/Board';
import { COLOR } from './board/defs';
import m from 'mithril';

m.mount(document.body, {
	view (vnode) {
		return m(Board, {
			player: COLOR.BLACK
		});
	}
});
