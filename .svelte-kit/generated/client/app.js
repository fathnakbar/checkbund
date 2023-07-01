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
	() => import('./nodes/17')
];

export const server_loads = [];

export const dictionary = {
		"/": [3],
		"/app": [4,[2]],
		"/app/bidan": [5,[2]],
		"/app/bidan/catatan": [6,[2]],
		"/app/bidan/catatan/add": [7,[2]],
		"/app/bumil": [8,[2]],
		"/app/profile": [9,[2]],
		"/clinic": [10],
		"/clinic/new": [11],
		"/confirm_redirect": [12],
		"/confirmed": [13],
		"/landing": [14],
		"/login": [15],
		"/register": [16],
		"/wait_confirm": [17]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';