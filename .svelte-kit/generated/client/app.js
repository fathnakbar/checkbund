export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16')
];

export const server_loads = [];

export const dictionary = {
		"/": [3],
		"/app": [4,[2]],
		"/app/bidan": [5,[2]],
		"/app/bumil": [6,[2]],
		"/app/catatan": [7,[2]],
		"/app/profile": [8,[2]],
		"/clinic": [9],
		"/clinic/new": [10],
		"/confirm_redirect": [12],
		"/confirmed": [11],
<<<<<<< HEAD
		"/landing": [13],
		"/login": [14],
		"/register": [15],
		"/wait_confirm": [16]
=======
		"/landing": [12],
		"/login": [13],
		"/register": [14],
		"/wait_confirm": [15]
>>>>>>> a32707ee1a7010108aa2c5789310728b6272045a
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';