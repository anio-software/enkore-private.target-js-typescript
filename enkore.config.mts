import {defineConfig} from "enkore"
import {defineRealmConfig} from "@enkore/realm-js"

export default defineConfig({
	realm: {
		name: "js",
		config: defineRealmConfig({
			runtime: "node",
			publishWithExactDependencyVersions: true,
			createTypesPackage: {
				orgName: "@enkore-types"
			},
			externalPackages: [
				"@babel/core",
				"@babel/preset-typescript",
				"typescript"
			]
		})
	}
})
