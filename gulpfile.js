const { src, dest, parallel, series, watch } = require('gulp');

const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const clean = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');



function styles() {
	return src('src/scss/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
	.pipe(dest('dist/styles/'))
}


function startwatch() {
	watch('src/scss/*', styles);
	watch(['src/*.html', 'src/*.php', 'src/**/*.html', 'src/**/*.php'], htmlAndPhp);
	watch('src/js/*.js', js);
}

async function cleanDistFolder() {
	return src('dist/*')
	.pipe(clean());
}

function htmlAndPhp() {
	return src(['src/*.html', 'src/*.php', 'src/**/*.html', 'src/**/*.php'], {base: 'src/'})
	.pipe(dest('dist/'))
}

function js() {
	return src('src/js/*.js')
	.pipe(uglify())
	.pipe(dest('dist/js/'))
}



exports.styles = styles;
exports.startwatch = startwatch;
exports.cleanDistFolder = cleanDistFolder;
exports.htmlAndPhp = htmlAndPhp;
exports.js = js;



exports.start = series(cleanDistFolder, htmlAndPhp, styles, js, startwatch);





