'use strict';
/*global describe,beforeEach,inject,it,expect*/
describe('Service: esUrlSvc', function () {

  beforeEach(module('o19s.splainer-search'));

  var esUrlSvc;

  beforeEach(inject(function (_esUrlSvc_) {
    esUrlSvc = _esUrlSvc_;
  }));

  describe('parse URL', function() {
    it('extracts the different parts of a URL', function() {
      var url = 'http://localhost:9200/tmdb/_search';
      esUrlSvc.parseUrl(url);

      expect(esUrlSvc.protocol).toBe('http:');
      expect(esUrlSvc.host).toBe('localhost:9200');
      expect(esUrlSvc.pathname).toBe('/tmdb/_search');

      var url = 'http://es.quepid.com/tmdb/_search';
      esUrlSvc.parseUrl(url);

      expect(esUrlSvc.protocol).toBe('http:');
      expect(esUrlSvc.host).toBe('es.quepid.com');
      expect(esUrlSvc.pathname).toBe('/tmdb/_search');

      var url = 'https://es.quepid.com/tmdb/_search';
      esUrlSvc.parseUrl(url);

      expect(esUrlSvc.protocol).toBe('https:');
      expect(esUrlSvc.host).toBe('es.quepid.com');
      expect(esUrlSvc.pathname).toBe('/tmdb/_search');
    });

    it('adds http if the protocol is missing', function() {
      var url = 'localhost:9200/tmdb/_search';
      esUrlSvc.parseUrl(url);

      expect(esUrlSvc.protocol).toBe('http:');
    });
  });

  describe('build doc URL', function() {
    var url = 'http://localhost:9200/tmdb/_search';

    var doc = {
      _index: 'tmdb',
      _type:  'movies',
      _id:    '1'
    }

    beforeEach( function () {
      esUrlSvc.parseUrl(url);
    });

    it('builds a proper doc URL from the doc info', function() {
      var docUrl = esUrlSvc.buildDocUrl(doc);

      expect(docUrl).toBe('http://localhost:9200/tmdb/movies/1');
    });
  });

  describe('build doc URL', function() {
    var url = 'http://localhost:9200/tmdb/_search';

    it('returns the original URL if no params are passed', function() {
      var returnedUrl = esUrlSvc.buildUrl(url);

      expect(returnedUrl).toBe(url);
    });

    it('returns the original URL if params passed is empty', function() {
      var params = { };
      var returnedUrl = esUrlSvc.buildUrl(url, params);

      expect(returnedUrl).toBe(url);
    });

    it('appends params to the original URL', function() {
      var params = { foo: "bar" };
      var returnedUrl = esUrlSvc.buildUrl(url, params);

      expect(returnedUrl).toBe(url + '?foo=bar');

      var params = { foo: "bar", bar: "foo" };
      var returnedUrl = esUrlSvc.buildUrl(url, params);

      expect(returnedUrl).toBe(url + '?foo=bar&bar=foo');
    });
  });
});
