// https://www.youtube.com/watch?v=xk6tK8bSeEc&list=PLM0LBHjz37LVNapdMeupY-SevP4TrgVxZ&index=1
"use strict";
const { src, dest, series, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
sass.compiler = require("node-sass");
const autoprefixer = require("gulp-autoprefixer");
const { join } = require("path");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");

const path = join(__dirname);
console.log("path", path);

const compileSCSS = () => {
  return src(join(path, "scss", "*.scss"))
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer("last 2 versions", "> 1%", "Explorer 7", "Android 2"))
    .pipe(dest(join(path, "css")));
};

const minifyCSS = (cb) => {
  src(join(path, "css", "!(*.min).css"))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(
      rename(({ dirname, basename, extname }) => ({
        dirname,
        basename: `${basename}.min`,
        extname,
      }))
    )
    .pipe(dest(join(path, "css")));
  cb();
};

const watchSASS = () => {
    watch(path, series(compileSCSS, minifyCSS));
}

exports.default = series(compileSCSS, minifyCSS);
// exports.watchSASS = watchSASS;
