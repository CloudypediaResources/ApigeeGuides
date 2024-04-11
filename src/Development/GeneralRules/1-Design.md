# API Proxy Design Documents

This API design document serves as a guide for the team to follow when implementing APIs using the OpenAPI 3.0
specification. It is based on the given example YAML file and provides explanations and instructions on how to structure
the API and define its components.

## Table of Contents

- [API Design Document For REGA Project](#api-proxy-design-documents)
    - [General Structure](#general-structure)
    - [Info Section](#info-section)
    - [Server Section](#server-section)
    - [Paths Section](#paths-section)
    - [Components Section](#components-section)
    - [Security Section](#security-section)
    - [Summary](#summary)
    - [YAML Template](#yaml-template)

## General Structure

An OpenAPI document should have the following sections:

1. **openapi**: The version of the OpenAPI Specification being used (e.g., openapi: 3.0.1).
2. **info**: Metadata about the API, including title, description, and version.
3. **servers**: An array of Server Objects, which provide the base URLs for the API's endpoints.
4. **paths**: A map of the APIs endpoints, where each key is a unique path and the value is a Path Item Object
   describing the operations available on that path.
5. **components**: A collection of reusable components for the API, including schemas and security schemes.
6. **security**: An optional array of Security Requirement Objects, which apply to all API operations unless overridden
   on the individual operation level.

## Info Section

The *info* section should contain the following fields:

- **title**: A brief, descriptive title for the API, that consist of the groupName of the task and operation name.
    - **example**: "groupName-OperationName", "SCE-GetUserInformation"
    - **Note**: mostly the name of the Drive Folder that holds the API documentation.
- **description**: A detailed description of the APIs purpose and functionality.
- **version**: The current version of the API (e.g., '1').

## Server Section

The *servers* section should contain an array of Server Objects, each describing a base URL for the APIs endpoints. For
example:

```yaml
servers:
  - url: https://api.hostname.com/v1/group-name/example-path-1
```

The `url` field should contain:

- The base URL i.e. `https://api.hostname.com` for the API.
- The version of the API i.e. `v1`.
- The groupName of the operation i.e. `groupName`,`SCE`,`REGA`,`HRSD`.
- The resource name i.e. `example-path-1`,`user-informations`,`user-details`.
    - To follow the naming standard for the resource name, use the following kebab-case format: `resource-name`.
    - Use plural form for the resource name.
    - Remove any special characters, spaces, or capital letters from the resource name.
    - Remove the verb from the resource name, such as "get", "create", "update", etc.
    - Eliminate suffixes such as "byID", "byName", "byEmail", etc.

**for further details, refer to: [this](#url-naming-conventions)**

## Paths Section

The *paths* section is a map of the APIs endpoints, defined as follows:

1. Each key in the Path object is a unique path, such as `/` or `/example-path`.
2. Under that key, define a operation verb e.g. `get`, `post`,`option`, `put`, etc.
3. Each operation should have the following:
    1. **tags**: An array of strings that's **preferred** `groupName`, `operationName`, `resourceName`.
    2. **summary**: A brief description of the operation.
    3. **operationId**: A unique identifier for the operation **preferred** `operationName`.
    4. **[requestBody](#requestbody-should-be-defined-as-follows)**: An optional Request Body Object describing the
       request body for the operation.
    5. **[parameters](#parameters-should-be-defined-as-follows)**: An optional array of Parameter Objects describing any
       input parameters for the operation.
    6. **[responses](#responses-should-be-defined-as-follows)**: A map of possible HTTP response codes (e.g., '200', '
       401') with corresponding Response Objects.

### **RequestBody** should be defined as follows:

1. **description**: A brief description of the request body.
2. **required**: A boolean value indicating whether the request body is required, default is `false`.
3. **content**: A map of media types and their corresponding Request Objects inside schema key.
    1. The media type of the request body (e.g., 'application/json', 'application/xml').
    2. **schema**: The request body object or reference to it.
        - schema can be defined as one object or as oneOf, anyOf, allOf
        - oneOf: An array of possible schemas, where at least one of them must match the request body.
        - anyOf: An array of possible schemas, where any of them can match the request body.
        - allOf: An array of schemas, where all of them must match the request body.

       applied to all schemas despite the type of the parent RequestBody, Response, or component.

#### **example** for designing request body:

```yaml
requestBody:
  description: Request body description in CommonMark or HTML.
  required: true
  content:
    application/json:
      schema:
        oneOf:
          - "$ref": "#/components/schemas/RequestBodyName"
          - "$ref": "#/components/schemas/RequestBodyName"
        #or
        anyOf:
          - "$ref": "#/components/schemas/RequestBodyName"
          - "$ref": "#/components/schemas/RequestBodyName"
        #or
        allOf:
          - "$ref": "#/components/schemas/RequestBodyName"
          - "$ref": "#/components/schemas/RequestBodyName"
```

**Note**: The requestBody may be defined as a separate schema in the components section under requestBodies key not
schema like responses.

```yaml
requestBody:
  "$ref": "#/components/requestBodies/RequestBodyName"

requestBodies:
  RequestWrapperName:
    description: Request body description in CommonMark or HTML.
    required: true
    content:
      application/json:
        "$ref": "#/components/schemas/RequestBodySchemaName"
      application/xml:
        "$ref": "#/components/schemas/RequestBodySchemaName"
```

### **Parameters** should be defined as follows:

1. **name**: The name of the parameter.
2. **in**: The location of the parameter (e.g., 'path', 'query', 'header', 'cookie').
3. **required**: A boolean value indicating whether the parameter is required, default is `false`.
4. **description**: A brief description of the parameter.
5. **schema**: A reference to the schema of the parameter.
    1. **type**: The type of the parameter (e.g., 'string', 'integer', 'boolean').
    2. **format**: The format of the parameter (e.g., 'int32', 'int64', 'date', 'date-time').
    3. **minimum**: The minimum value of the parameter.
    4. **maximum**: The maximum value of the parameter.
    5. **enum**: An array of possible values for the parameter.
    6. **default**: The default value of the parameter.
    7. **example**: An example value for the parameter.

#### **example** for designing parameters:

 ```yaml
parameters:
  - name: userId
    description: Parameter description in CommonMark or HTML.
    in: path
    required: true
    schema:
      type: integer
      format: int64
      minimum: 1
```

### **Responses** should be defined as follows:

1. Keys are the HTTP status code, agreed on using i.g. (`1xx`,`2xx`,`3xx`,`4xx`,`5xx`)
2. Each value is a Response Object, which should contain:
    1. **description:** A short description of the response.
    2. **content:** A map of media types and their corresponding Response Objects inside schema key.
        1. **mediaType:** The media type of the response (e.g., 'application/json', 'application/xml').
        2. **schema:** The response object or reference to it.

## Components Section

The *components* section should define reusable components for the API, such as schemas and security schemes.

1. **schemas**: Objects that define the structure of the data used in the API, such as request and response bodies.
    - Define separate schemas for each distinct data type used in the API, such as "ResponseWrapperName", "
      CommonErrorStructure", and "basicErrorStructure".
2. **requestBodies**: Objects that define the structure of the request bodies used in the API.
    - Define separate request bodies for each distinct request body used in the API, such as "RequestBodyName".
3. **securitySchemes**: Objects that define the authentication methods used in the API.
    - Define the "BearerAuth" security scheme as an HTTP authentication method using the bearer scheme.

> ### **Hints** for designing schemas components:

> - Any object that have more than 3 nested level should be defined as a separate schema.
> - Any object that is used in more than one place should be defined as a separate schema.
> - In our case e.g. basicErrorStructure is used in all responses.
> - Any object that contains more than 7 simple or 3 complex properties should be defined as a separate schema.

## Security Section

The *security* section should define the global security requirements for all API operations. It can be overridden by
specifying different security requirements on the individual operation level.

To require Bearer authentication for all endpoints, define the security requirement as follows:

```yaml
security:
  - BearerAuth: [ ]
```

## Summary

By following this design document, the team can create standard, consistent, and well-structured APIs using the OpenAPI
3.0 specification. Remember to use the given YAML file as an example and refer to this document for guidance on defining
the various sections and components within your APIs.

### YAML Template

```yaml
openapi: 3.0.1
info:
  title:
  description:
  version: '1'
servers:
  - url: http://api.hostname.com/v1/group-name/example-path-1
paths:
  "/":
    get:
      tags:
        -
      summary:
      operationId:
      parameters:

      responses:
        '200':
          $ref: "#/components/responses/SuccessResponse"
        '401':
          $ref: "#/components/responses/UnauthorizedResponse"
        '404':
          $ref: "#/components/responses/NotFoundResponse"
        '405':
          $ref: "#/components/responses/MethodNotAllowedResponse"
        '415':
          $ref: "#/components/responses/UnsupportedMediaTypeResponse"
        '500':
          $ref: "#/components/responses/InternalServerErrorResponse"

    post:
      tags:
        -
        -
      summary:
      operationId:

      parameters:

      requestBody:
        $ref: "#/components/requestBodies/RequestBodyName"

      responses:
        '200':
          $ref: "#/components/responses/SuccessResponse"
        '401':
          $ref: "#/components/responses/UnauthorizedResponse"
        '404':
          $ref: "#/components/responses/NotFoundResponse"
        '405':
          $ref: "#/components/responses/MethodNotAllowedResponse"
        '415':
          $ref: "#/components/responses/UnsupportedMediaTypeResponse"
        '500':
          $ref: "#/components/responses/InternalServerErrorResponse"

components:
  # Reusable request bodies
  requestBodies:
    RequestBodyName:
      description: Request body description in CommonMark or HTML.
      required: true
      content:
        application/json:
          schema:
            "$ref": "#/components/schemas/RequestBodySchemaName"
        application/xml:
          schema:
            "$ref": "#/components/schemas/RequestBodySchemaName"

  responses:
    SuccessResponse:
      description: Successful Response
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/ResponseSchemaName"

    NotFoundResponse:
      description: Not Found
      content:
        application/json; charset=UTF-8:
          schema:
            "$ref": "#/components/schemas/basicErrorSchema"
          example:
            errorCode: "404"
            errorMessage: "Not Found"

    UnsupportedMediaTypeResponse:
      description: Unsupported Media Type
      content:
        application/json; charset=UTF-8:
          schema:
            "$ref": "#/components/schemas/basicErrorSchema"
          example:
            errorCode: "415"
            errorMessage: "Unsupported Media Type"

    MethodNotAllowedResponse:
      description: Method Not Allowed
      content:
        application/json; charset=UTF-8:
          schema:
            "$ref": "#/components/schemas/basicErrorSchema"
          example:
            errorCode: "405"
            errorMessage: "Method Not Allowed"

    UnauthorizedResponse:
      description: Unauthorized
      content:
        application/json; charset=UTF-8:
          schema:
            "$ref": "#/components/schemas/basicErrorSchema"
          example:
            errorCode: "401"
            errorMessage: "Unauthorized"

    InternalServerErrorResponse:
      description: Internal Server Error
      content:
        application/json; charset=UTF-8:
          schema:
            "$ref": "#/components/schemas/basicErrorSchema"

  # Reusable schemas (data models)
  schemas:
    ResponseSchemaName:
      type: object
      properties:

    RequestBodySchemaName:
      type: object
      properties:

    basicErrorSchema:
      type: object
      properties:
        status:
          type: string
        source:
          type: object
        title:
          type: string
        detail:
          type: string

  # Security scheme definitions (see Authentication)       
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer

  # Reusable path, query, header and cookie parameters
  parameters:

  # Reusable responses, such as 401 Unauthorized or 400 Bad Request


  # Reusable response headers
  headers:

  # Reusable examples
  examples:

  # Reusable links
  links:

  # Reusable callbacks
  callbacks:

security:
  - BearerAuth: [ ]
```

### References

#### Swagger

- [OpenAPI 3.0 Specification](https://swagger.io/specification/)
- [Best Practices in API Design](https://swagger.io/resources/articles/best-practices-in-api-design)

#### URL Naming Conventions

- [Restful API Tutorial](https://restfulapi.net/resource-naming)
- [Medium article](https://medium.com/@nadinCodeHat/rest-api-naming-conventions-and-best-practices-1c4e781eb6a5)
