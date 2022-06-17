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
	watch('src/*.*', justReplace);
	watch('src/js/*.js', js);
}

async function cleanDistFolder() {
	return src('dist/*')
	.pipe(clean());
}

function justReplace() {
	return src('src/*.*', {base: 'src/'})
	.pipe(dest('dist/'))
}

function js() {
	return src('src/js/*.js')
	//.pipe(uglify())
	.pipe(dest('dist/js/'))
}

function images() {
	return src('src/images/**/*.*', {base: 'src/'})
	.pipe(dest('dist/'))
}

exports.start = series(cleanDistFolder, justReplace, styles, js, images, startwatch);





