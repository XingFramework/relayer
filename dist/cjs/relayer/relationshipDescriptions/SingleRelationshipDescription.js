'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _RelationshipDescriptionJs = require('./RelationshipDescription.js');

var _RelationshipDescriptionJs2 = _interopRequireDefault(_RelationshipDescriptionJs);

var SingleRelationshipDescription = (function (_RelationshipDescription) {
  function SingleRelationshipDescription(relationshipInitializerFactory, resourceMapperFactory, resourceSerializerFactory, inflector, primaryResourceTransformerFactory, embeddedRelationshipTransformerFactory, resolvedEndpointFactory, loadedDataEndpointFactory, templatedUrlFactory, name, ResourceClass, initialValues) {
    _classCallCheck(this, SingleRelationshipDescription);

    _get(Object.getPrototypeOf(SingleRelationshipDescription.prototype), 'constructor', this).call(this, relationshipInitializerFactory, resourceMapperFactory, resourceSerializerFactory, inflector, name, ResourceClass, initialValues);

    this.primaryResourceTransformerFactory = primaryResourceTransformerFactory;
    this.embeddedRelationshipTransformerFactory = embeddedRelationshipTransformerFactory;
    this.resolvedEndpointFactory = resolvedEndpointFactory;
    this.loadedDataEndpointFactory = loadedDataEndpointFactory;
    this.templatedUrlFactory = templatedUrlFactory;
    this._templated = false;
  }

  _inherits(SingleRelationshipDescription, _RelationshipDescription);

  _createClass(SingleRelationshipDescription, [{
    key: 'templated',
    set: function (templated) {
      this._templated = templated;
    },
    get: function () {
      return this._templated;
    }
  }, {
    key: 'embeddedEndpoint',
    value: function embeddedEndpoint(parent, uriParams) {
      if (this._templated) {
        throw 'A templated hasOne relationship cannot be embedded';
      }
      var parentEndpoint = parent.self();
      var embeddedRelationshipTransformer = this.embeddedRelationshipTransformerFactory(this.name);
      return this.loadedDataEndpointFactory(parentEndpoint, parent, embeddedRelationshipTransformer);
    }
  }, {
    key: 'linkedEndpoint',
    value: function linkedEndpoint(parent, uriParams) {
      var transport = parent.self().transport;
      var url = parent.pathGet(this.linksPath);
      var params = this._templated ? uriParams : {};
      var templatedUrl = this.templatedUrlFactory(url, params);
      if (!this._templated) {
        templatedUrl.addDataPathLink(parent, this.linksPath);
      }
      var primaryResourceTransformer = this.primaryResourceTransformerFactory(this);
      return this.resolvedEndpointFactory(transport, templatedUrl, primaryResourceTransformer);
    }
  }], [{
    key: 'factoryNames',
    get: function () {
      return ['SingleRelationshipInitializerFactory', 'ResourceMapperFactory', 'ResourceSerializerFactory', 'Inflector', 'PrimaryResourceTransformerFactory', 'EmbeddedRelationshipTransformerFactory', 'ResolvedEndpointFactory', 'LoadedDataEndpointFactory', 'TemplatedUrlFactory'];
    }
  }]);

  return SingleRelationshipDescription;
})(_RelationshipDescriptionJs2['default']);

exports['default'] = SingleRelationshipDescription;
module.exports = exports['default'];