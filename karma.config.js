// Currently using https://github.com/istanbuljs/babel-plugin-istanbul,
// Switch to: https://github.com/webpack-contrib/istanbul-instrumenter-loader
module.exports = function( config ) {
	config.set( {
		frameworks: [ 'jasmine', 'es6-shim' ],
		reporters: [ 'spec', 'coverage' ],
		browsers: [ 'PhantomJS' ],
		colors: true,

		// ... normal karma configuration
		files: [
			'node_modules/babel-polyfill/dist/polyfill.js',
			'https://code.jquery.com/jquery-1.12.4.min.js',
			'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js',
			'https://code.jquery.com/ui/1.12.1/jquery-ui.min.js',

			// All files ending in "_test"
			// { pattern: 'test/*_test.js', watched: false }

			{ pattern: 'tests/**/*_test.js', watched: false }

			// Each file acts as entry point for the webpack configuration
		],

		preprocessors: {

			// Add webpack as preprocessor
			'tests/*_test.js': [ 'webpack', 'sourcemap' ],
			'tests/**/*_test.js': [ 'webpack', 'sourcemap' ]
		},

		// Optionally, configure the reporter
		coverageReporter: {
			type: 'html',
			dir: 'coverage/',
			reporters: [

				// Reporters not supporting the `file` property
				{ type: 'html', subdir: 'report-html' },
				{ type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
				{ type: 'lcov', subdir: 'report-lcov' }
			]
		},

		webpack: require( './tools/config/webpack.test.js' ),

		webpackMiddleware: {

			// Webpack-dev-middleware configuration
			// i. e.
			stats: 'errors-only'
		}
	} );
};
