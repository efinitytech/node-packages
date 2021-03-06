const gulp = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.build.json");
const webpack = require("webpack-stream");
const rimraf = require("rimraf");
const terser = require('gulp-terser');

const babel = require('gulp-babel');

const clean = () => new Promise(cb => {
    rimraf('dist/*', () => {
        console.log('done cleaning')
        cb();
    });
})

function typescript(cb) {
    // Build ts to js:
    const { js, dts } = tsProject
        .src()
        .pipe(tsProject());

    // JavaScript output (signal complete afterward):
    js.pipe(gulp
        .dest('dist')
        .on('end', function () {
            return gulp.src('./types/helem/*.d.ts')
                .pipe(gulp
                    .dest('./dist/types/helem')
                    .on('end', () => {
                        console.log('Types coppied')
                        return cb();
                    }))
        })
    );

    // Declaration files:
    dts.pipe(gulp.dest('dist'));
}

function iife(cb) {
    gulp.src('dist/index.js')
        .pipe(webpack({
            mode: 'production',
            output: {
                filename: 'index.js',
                library: 'helem',
                libraryTarget: 'window',
                libraryExport: 'default'
            },
            optimization: {
                minimize: false
            }
        }))
        .pipe(babel({
            presets: [
                ['@babel/env', {
                    "targets": {
                        "browsers": ">2.5%"
                    }
                }]
            ]
        }))
        .pipe(gulp.dest('dist/web/development/'))
        .pipe(terser())
        .pipe(gulp.dest('dist/web/').on('end', cb))
}

exports.typescript = typescript;
exports.iife = iife;
exports.clean = clean;
exports.build = gulp.series(typescript, iife)
exports.default = async function () {
    console.log('Watching...')
    await clean();
    gulp.watch(['types/**/*.d.ts', 'src/**/*'], { ignoreInitial: false },
        gulp.series(typescript, iife))
}
