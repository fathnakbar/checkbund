export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.ico","favicon.png","init.js","js/init.js"]),
	mimeTypes: {".ico":"image/vnd.microsoft.icon",".png":"image/png",".js":"application/javascript"},
	_: {
		client: {"start":"_app/immutable/entry/start.1964df4c.js","app":"_app/immutable/entry/app.9f17fc26.js","imports":["_app/immutable/entry/start.1964df4c.js","_app/immutable/chunks/index.03fbab45.js","_app/immutable/chunks/singletons.86129028.js","_app/immutable/entry/app.9f17fc26.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/index.03fbab45.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js')
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
