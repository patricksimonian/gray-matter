/*!
 * gray-matter <https://github.com/assemble/gray-matter>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var should = require('should');
var matter = require('..');


describe('Read from strings:', function () {
  it('should extract YAML front matter', function () {
    var actual = matter('---\nabc: xyz\n---');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
    actual.data.should.have.property('abc');
    actual.data.abc.should.equal('xyz');
  });

  it('should throw an error when front-matter cannot be parsed:', function () {
    (function() {
      matter('---whatever\nabc: xyz\n---')
    }).should.throw('gray-matter cannot find a parser for: ---whatever\nabc: xyz\n---')
  });

  it('should throw an error when a string is not passed:', function () {
    (function() {
      matter()
    }).should.throw('gray-matter expects a string')
  });

  it('should extract YAML front matter and content', function () {
    var fixture = '---\nabc: xyz\nversion: 2\n---\n\n<span class="alert alert-info">This is an alert</span>\n';
    var actual = matter(fixture);
    actual.should.have.property('data', {abc: 'xyz', version: 2});
    actual.should.have.property('content', '<span class="alert alert-info">This is an alert</span>');
    actual.should.have.property('orig');
  });

  it('should use custom delimiters.', function () {
    var fixture = '~~~\nabc: xyz\nversion: 2\n~~~\n\n<span class="alert alert-info">This is an alert</span>\n';
    var actual = matter(fixture, {delims: ['~~~', '~~~']});
    actual.should.have.property('data', {abc: 'xyz', version: 2});
    actual.should.have.property('content', '<span class="alert alert-info">This is an alert</span>');
    actual.should.have.property('orig');
  });
});

