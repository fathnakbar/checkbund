export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.ico","favicon.png","init.js","js/init.js"]),
	mimeTypes: {".ico":"image/vnd.microsoft.icon",".png":"image/png",".js":"application/javascript"},
	_: {
		client: {"start":"_app/immutable/entry/start.08076cfa.js","app":"_app/immutable/entry/app.0b883864.js","imports":["_app/immutable/entry/start.08076cfa.js","_app/immutable/chunks/index.7f6451f6.js","_app/immutable/chunks/singletons.f809ae5f.js","_app/immutable/entry/app.0b883864.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/index.7f6451f6.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js'),
			() => import('./nodes/6.js'),
			() => import('./nodes/7.js'),
			() => import('./nodes/8.js'),
			() => import('./nodes/9.js'),
			() => import('./nodes/10.js'),
			() => import('./nodes/11.js'),
			() => import('./nodes/12.js'),
			() => import('./nodes/13.js'),
			() => import('./nodes/14.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/app",
				pattern: /^\/app\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/app/bidan",
				pattern: /^\/app\/bidan\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/app/bidan/catatan",
				pattern: /^\/app\/bidan\/catatan\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/app/bidan/catatan/add",
				pattern: /^\/app\/bidan\/catatan\/add\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/app/bumil",
				pattern: /^\/app\/bumil\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/app/profile",
				pattern: /^\/app\/profile\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/clinic",
				pattern: /^\/clinic\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/clinic/new",
				pattern: /^\/clinic\/new\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/landing",
				pattern: /^\/landing\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
