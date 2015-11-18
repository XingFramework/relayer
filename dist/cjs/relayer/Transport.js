'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _ConstructableJs = require('./Constructable.js');

var _ConstructableJs2 = _interopRequireDefault(_ConstructableJs);

var Transport = (function (_Constructable) {
  function Transport(urlHelper, $http) {
    _classCallCheck(this, Transport);

    _get(Object.getPrototypeOf(Transport.prototype), 'constructor', this).call(this);
    this.http = $http;
    this.urlHelper = urlHelper;
  }

  _inherits(Transport, _Constructable);

  _createClass(Transport, [{
    key: 'get',
    value: function get(url) {
      var etag = arguments[1] === undefined ? null : arguments[1];

      var getParams = {
        method: 'GET',
        url: this.urlHelper.fullUrl(url)
      };
      if (etag) {
        getParams.headers = {};
        getParams.headers['If-None-Match'] = etag;
      }
      return this.resolve(this.http(getParams));
    }
  }, {
    key: 'put',
    value: function put(url, data) {
      var etag = arguments[2] === undefined ? null : arguments[2];

      var putParams = {
        method: 'PUT',
        url: this.urlHelper.fullUrl(url),
        data: data
      };
      if (etag) {
        putParams.headers = {};
        putParams.headers['If-Match'] = etag;
      }
      return this.resolve(this.http(putParams));
    }
  }, {
    key: 'post',
    value: function post(url, data) {
      return this.resolve(this.http({
        method: 'POST',
        url: this.urlHelper.fullUrl(url),
        data: data
      }));
    }
  }, {
    key: 'delete',
    value: function _delete(url) {
      return this.resolve(this.http({
        method: 'DELETE',
        url: this.urlHelper.fullUrl(url)
      }));
    }
  }, {
    key: 'resolve',
    value: function resolve(backendResponds) {
      var _this = this;

      return backendResponds.then(function (fullResponse) {
        if (fullResponse.status === 201 && fullResponse.headers().location) {
          var locationUrl = _this.absolutizeResponseLocation(fullResponse);
          return _this.get(locationUrl);
        } else {
          var response = {};
          response.data = fullResponse.data;
          response.etag = fullResponse.headers().ETag;
          return response;
        }
      }, function (errorResponse) {
        throw errorResponse;
      });
    }
  }, {
    key: 'absolutizeResponseLocation',
    value: function absolutizeResponseLocation(fullResponse) {
      return this.urlHelper.checkLocationUrl(fullResponse.headers().location, fullResponse.config.url);
    }
  }]);

  return Transport;
})(_ConstructableJs2['default']);

exports['default'] = Transport;
module.exports = exports['default'];