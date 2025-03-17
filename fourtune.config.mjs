export default {
	realm: {
		name: "js",
		type: "package",

		options: {
			runtime: "node",
			external_npm_packages: [
				"@babel/core",
				"@babel/preset-typescript",
				"typescript"
			]
		}
	}
}
