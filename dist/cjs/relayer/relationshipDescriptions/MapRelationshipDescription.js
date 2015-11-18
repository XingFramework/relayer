'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _MultipleRelationshipDescriptionJs = require('./MultipleRelationshipDescription.js');

var _MultipleRelationshipDescriptionJs2 = _interopRequireDefault(_MultipleRelationshipDescriptionJs);

var MapRelationshipDescription = (function (_MultipleRelationshipDescription) {
  function MapRelationshipDescription() {
    _classCallCheck(this, MapRelationshipDescription);

    if (_MultipleRelationshipDescription != null) {
      _MultipleRelationshipDescription.apply(this, arguments);
    }
  }

  _inherits(MapRelationshipDescription, _MultipleRelationshipDescription);

  _createClass(MapRelationshipDescription, null, [{
    key: 'factoryNames',
    get: function () {
      return ['MapRelationshipInitializerFactory', 'MapResourceMapperFactory', 'MapResourceSerializerFactory', 'Inflector', 'EmbeddedRelationshipTransformerFactory', 'SingleFromManyTransformerFactory', 'LoadedDataEndpointFactory'];
    }
  }]);

  return MapRelationshipDescription;
})(_MultipleRelationshipDescriptionJs2['default']);

exports['default'] = MapRelationshipDescription;
module.exports = exports['default'];