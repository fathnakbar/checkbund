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
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18')
];

export const server_loads = [];

export const dictionary = {
		"/": [3],
		"/app": [4,[2]],
		"/app/bidan": [5,[2]],
		"/app/bidan/catatan": [6,[2]],
		"/app/bidan/catatan/add": [7,[2]],
		"/app/bidan/catatan/view": [8,[2]],
		"/app/bumil": [9,[2]],
		"/app/profile": [10,[2]],
		"/clinic": [11],
		"/clinic/new": [12],
		"/confirm_redirect": [13],
		"/confirmed": [14],
		"/landing": [15],
		"/login": [16],
		"/register": [17],
		"/wait_confirm": [18]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';