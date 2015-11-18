import Constructable from './Constructable.js';

export default class ResourceBuilder extends Constructable {
  static get factoryNames(){
    return [
      "TemplatedUrlFromUrlFactory",
      "ResolvedEndpointFactory",
      "ThrowErrorTransformerFactory",
      "CreateResourceTransformerFactory"
    ];
  }

  constructor(templatedUrlFromUrlFactory,
    resolvedEndpointFactory,
    throwErrorTransformerFactory,
    createResourceTransformerFactory,
    transport,
    response,
    primaryResourceTransformer,
    ResourceClass,
    relationshipDescription) {
      super();

      this.transport = transport;
      this.ResourceClass = ResourceClass;
      this.relationshipDescription = relationshipDescription;

      this.templatedUrlFromUrlFactory = templatedUrlFromUrlFactory;
      this.resolvedEndpointFactory = resolvedEndpointFactory;
      this.throwErrorTransformerFactory = throwErrorTransformerFactory;
      this.createResourceTransformerFactory = createResourceTransformerFactory;
      this.response = response;
      this.primaryResourceTransformer = primaryResourceTransformer;

  }

  build(uriTemplate = null) {
    var resource = new this.ResourceClass(this.response);
    if (resource.pathGet("$.links.self")) {
      if (uriTemplate) {
        resource.templatedUrl = this.templatedUrlFromUrlFactory(uriTemplate, resource.pathGet("$.links.self"));
      } else {
        resource.templatedUrl = this.templatedUrlFromUrlFactory(resource.pathGet("$.links.self"), resource.pathGet("$.links.self"));
      }
      resource.templatedUrl.addDataPathLink(resource, "$.links.self");
      if (this.relationshipDescription.canCreate) {
        var createUriTemplate = uriTemplate || resource.pathGet("$.links.template");
        var createResourceTransformer = this.createResourceTransformerFactory(this.relationshipDescription.createRelationshipDescription, createUriTemplate);
      } else {
        var createResourceTransformer = this.throwErrorTransformerFactory();
      }
      var endpoint = this.resolvedEndpointFactory(this.transport, resource.templatedUrl, this.primaryResourceTransformer, createResourceTransformer);
      resource.self = function() { return endpoint; }
    }
    return resource;
  }
}
