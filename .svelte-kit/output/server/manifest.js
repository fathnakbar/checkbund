export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.ico","favicon.png","init.js","js/init.js"]),
	mimeTypes: {".ico":"image/vnd.microsoft.icon",".png":"image/png",".js":"application/javascript"},
	_: {
		client: {"start":"_app/immutable/entry/start.08076cfa.js","app":"_app/immutable/entry/app.0b883864.js","imports":["_app/immutable/entry/start.08076cfa.js","_app/immutable/chunks/index.7f6451f6.js","_app/immutable/chunks/singletons.f809ae5f.js","_app/immutable/entry/app.0b883864.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/index.7f6451f6.js"],"stylesheets":[],"fonts":[]},
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
