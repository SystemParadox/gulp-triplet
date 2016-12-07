'use strict';
var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var objectAssign = require('object-assign');
var triplet = require('triplet');


module.exports = function (opts) {
    opts = opts || {};

    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        try {
            var fileOpts = objectAssign({}, opts);

            if (file.path && ! opts.filename) {
                fileOpts.filename = path.relative(file.cwd, file.path);
            }

            if (file.isBuffer()) {
                var output = triplet(file.contents, fileOpts);
                file.contents = new Buffer(output);
            }

            if (file.isStream()) {
                file.contents = triplet(file.contents, opts);
            }

            this.push(file);
        } catch (err) {
            this.emit('error', new gutil.PluginError('gulp-triplet', err, {
                fileName: file.path,
                showProperties: false
            }));
        }

        cb();
    });
};
