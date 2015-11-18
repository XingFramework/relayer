import CreateResourceTransformer from "../../src/relayer/transformers/CreateResourceTransformer.js";


describe("CreateResourceTransformer", function() {
  var createResourceTransformer, mockEndpoint, mockTransport, mockResponse, resource,
  primaryResourceMapperFactory, primaryResourceSerializerFactory, ResourceClass, response,
  primaryResourceMapper;
  var mockTemplatedUrlSpy, templatedUrl;
  var relationship;

  beforeEach(function() {


    mockResponse = {
      data: {
        bilbo: "baggins"
      },
      etag: "123"
    }

    mockTransport = {

    }

    templatedUrl = {

    }

    mockEndpoint = {
      transport: mockTransport,
      templatedUrl: templatedUrl
    }

    ResourceClass = function(thisResponse) {
      this.response = thisResponse;
      this.templatedUrl = templatedUrl;
    };

    ResourceClass.errorClass = function(thisResponse) {
      this.error = thisResponse;
    };

    primaryResourceMapper = {
      map() {
        if (this.useErrors) {
          var ErrorClass = this.relationshipDescription.ResourceClass.errorClass;
          return new ErrorClass(this.response);
        } else {
          return new this.relationshipDescription.ResourceClass(this.response);
        }
      }
    };

    primaryResourceMapperFactory = jasmine.createSpy("primaryResourceMapperFactory").and.callFake(
      function(thisTransport, thisResponse, thisRelationshipDescription, thisEndpoint, useErrors) {
      primaryResourceMapper.relationshipDescription = thisRelationshipDescription;
      primaryResourceMapper.transport = thisTransport;
      primaryResourceMapper.response = thisResponse;
      primaryResourceMapper.endpoint = thisEndpoint;
      primaryResourceMapper.useErrors = useErrors;
      return primaryResourceMapper;
    });

    primaryResourceSerializerFactory = jasmine.createSpy("primaryResourceSerializerFactory").and.callFake(
      function(thisResource) {
      return {
        serialize() {
          return thisResource.response;
        }
      }
    });

    resource = new ResourceClass(mockResponse);

    relationship = {
      ResourceClass: ResourceClass,
      mapperFactory: primaryResourceMapperFactory,
      serializerFactory: primaryResourceSerializerFactory
    }

    createResourceTransformer = new CreateResourceTransformer(relationship, "/cheese/{variety}");

  });

  describe("transformResponse", function() {
    describe("on success", function() {
      beforeEach(function(done) {
        var promise = Promise.resolve(mockResponse);
        resource = createResourceTransformer.transformResponse(mockEndpoint, promise);
        resource.then((finalResource) => {
          resource = finalResource;
          done();
        });
      });

      it("should build a resource of the given class", function() {
        expect(resource).toEqual(jasmine.any(ResourceClass));
      });

      it("should build a resource with the right parameters and data", function() {
        expect(resource.response).toEqual(mockResponse.data);
      });

      it("should call the mapper with the right parameters", function() {
        expect(primaryResourceMapperFactory).toHaveBeenCalledWith(
          mockTransport,
          mockResponse.data,
          relationship);
      });

      it("should set the uri template on the priamry resource mapper", function() {
        expect(primaryResourceMapper.uriTemplate).toEqual("/cheese/{variety}")
      });

      it("should set the etag", function() {
        expect(templatedUrl.etag).toEqual("123");
      });
    });

    describe("on error", function() {
      beforeEach(function(done) {
        var promise = Promise.reject(mockResponse);
        resource = createResourceTransformer.transformResponse(mockEndpoint, promise);
        resource.catch((finalResource) => {
          resource = finalResource;
          done();
        });
      });

      it("should build a resource of the given class", function() {
        expect(resource).toEqual(jasmine.any(ResourceClass.errorClass));
      });

      it("should build a resource with the right parameters and data", function() {
        expect(resource.error).toEqual(mockResponse.data);
      });

      it("should call the mapper with the right parameters", function() {
        expect(primaryResourceMapperFactory).toHaveBeenCalledWith(
          mockTransport,
          mockResponse.data,
          relationship,
          null,
          true);
      });
    });
  });

  describe("transformRequest", function() {
    beforeEach(function() {
      response = createResourceTransformer.transformRequest(mockEndpoint, resource);
    });

    it("should extract the response from the resource", function() {
      expect(response).toEqual(mockResponse);
    });

    it("should call the serializer", function() {
      expect(primaryResourceSerializerFactory).toHaveBeenCalledWith(resource);
    });
  });
});
