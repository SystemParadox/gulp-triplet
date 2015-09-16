Gulp plugin for triplet strings.

Transforms this:

```
function hello() {
    var x = """
        hello
        world
    """;
}
```

into this:

```
function hello() {
    var x =


    "hello\nworld\n";
}
```

See the `triplet` package for more information.

Usage:

```
var gulp = require('gulp');
var triplet = require('gulp-triplet');

gulp.src('./src/**/*.js', { buffer: false })
    .pipe(triplet())
    .pipe(gulp.dest('./lib'));
```
