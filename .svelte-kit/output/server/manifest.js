export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.ico","favicon.png","init.js","js/init.js"]),
	mimeTypes: {".ico":"image/vnd.microsoft.icon",".png":"image/png",".js":"application/javascript"},
	_: {
		client: {"start":"_app/immutable/entry/start.cee92b5b.js","app":"_app/immutable/entry/app.eb093425.js","imports":["_app/immutable/entry/start.cee92b5b.js","_app/immutable/chunks/index.7f6451f6.js","_app/immutable/chunks/singletons.ad1b40ec.js","_app/immutable/entry/app.eb093425.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/index.7f6451f6.js"],"stylesheets":[],"fonts":[]},
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
