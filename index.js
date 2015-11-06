'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var PluginError = gutil.PluginError;
var _ = require('underscore');
var triplet = require('triplet');
var path = require('path');


module.exports = function (options) {
    return through.obj(function(file, enc, cb) {
        var opts = _.extend({}, options);
        if (file.path && ! opts.filename) {
            opts.filename = path.relative(file.cwd, file.path);
        }
        if (file.isBuffer()) {
            var output = triplet(file.contents, opts);
            file.contents = new Buffer(output);
        }

        if (file.isStream()) {
            file.contents = triplet(file.contents, opts);
        }

        this.push(file);
        cb();
    });
};
