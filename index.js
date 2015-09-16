'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var PluginError = gutil.PluginError;
var _ = require('underscore');
var triplet = require('triplet');


module.exports = function (options) {
    return through.obj(function(file, enc, cb) {
        if (file.isBuffer()) {
            var output = triplet(file.contents, options);
            file.contents = new Buffer(output);
        }

        if (file.isStream()) {
            file.contents = triplet(file.contents, options);
        }

        this.push(file);
        cb();
    });
};
