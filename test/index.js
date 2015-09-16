var assert = require('assert');
var es = require('event-stream');
var File = require('vinyl');
var triplet = require('../');

/*
var x = """
    hello
    world
""";
var x =


"hello world";
*/
var INPUT = 'var x = """\n    hello\n    world\n""";';
var EXPECTED = 'var x = \n\n\n"hello\\nworld\\n";';

describe('gulp-triplet', function () {
    it('should work with buffers', function (done) {
        // create the fake file
        var fakeFile = new File({
            contents: new Buffer(INPUT)
        });

        // Create a triplet plugin stream
        var mTriplet = triplet();

        // write the fake file to it
        mTriplet.write(fakeFile);

        // wait for the file to come back out
        mTriplet.once('data', function (file) {
            // make sure it came out the same way it went in
            assert(file.isBuffer());

            // check the contents
            assert.equal(file.contents.toString('utf8'), EXPECTED);
            done();
        });
    });

    it('should work with streams', function (done) {
        // create the fake file
        var fakeFile = new File({
            contents: es.readArray([INPUT])
        });

        // Create a triplet plugin stream
        var mTriplet = triplet();

        // write the fake file to it
        mTriplet.write(fakeFile);

        // wait for the file to come back out
        mTriplet.once('data', function (file) {
            // make sure it came out the same way it went in
            assert(file.isStream());

            file.contents.pipe(es.wait(function (err, data) {
                // check the contents
                assert.equal(data.toString(), EXPECTED);
                done();
            }));
        });
    });
});
