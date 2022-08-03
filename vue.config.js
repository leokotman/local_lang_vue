module.exports = {
	devServer: {
		host: "localhost",
	},
	publicPath: process.env.NODE_ENV === "production" ? "/local_lang_vue/" : "/",
	pages: {
		index: { entry: "src/main.js", title: "Serbian-English learning game" },
	},
};
