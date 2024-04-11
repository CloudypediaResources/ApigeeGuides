# API Design Document For REGA Project

This API design document serves as a guide for the team to follow when implementing APIs using the OpenAPI 3.0
specification. It is based on the given example YAML file and provides explanations and instructions on how to structure
the API and define its components.

## Table of Contents

- [API Design Document For REGA Project](#api-design-document-for-rega-project)
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
  - url: http://api-dev.rega.gov.sa/v1/group-name/example-path-1
```

The `url` field should contain:

- The base URL i.e. `http://api-dev.rega.gov.sa/` for the API.
- The version of the API i.e. `v1`.
- The groupName of the task i.e. `groupName`,`SCE`,`REGA`,`HRSD`.
- The resource name i.e. `example-path-1`,`user-information`,`user-details`.
    - To follow the naming standard for the resource name, use the following kebab-case format: `resource-name`.
    - Remove any special characters, spaces, or capital letters from the resource name.
    - Remove the verb from the resource name, such as "get", "create", "update", etc.
    - Eliminate suffixes such as "byID", "byName", "byEmail", etc.

## Paths Section

The *paths* section is a map of the API's endpoints, defined as follows:

1. Each key in the Path object is a unique path, such as `/` or `/example-path`.
2. Under that key, define a operation verb e.g. `get`, `post`,`option`, `put`, etc.
3. Each operation should have the following:
    1. **tags**: An array of strings that's **preferred** `groupName`, `operationName`, `resourceName`.
    2. **summary**: A brief description of the operation.
    3. **operationId**: A unique identifier for the operation **preferred** `operationName`.
    4. **requestBody**: An optional Request Body Object describing the request body for the operation.
    5. **parameters**: An optional array of Parameter Objects describing any input parameters for the operation.
    6. **responses**: A map of possible HTTP response codes (e.g., '200', '401') with corresponding Response Objects.

### **Parameters** should be defined as follows:

1. **name**: The name of the parameter.
2. **in**: The location of the parameter (e.g., 'path', 'query', 'header', 'cookie').
3. **required**: A boolean value indicating whether the parameter is required, default is `false`.
4. **schema**: A reference to the schema of the parameter.

### **Responses** should be defined as follows:

1. Keys are the HTTP status code, agreed on using (`200`,`401`,`405`,`415`,`500`)
2. Each value is a Response Object, which should contain:
    - **description**: A short description of the response.
    - **content**: A map of media types and their corresponding Response Objects inside
      200:
      description: New response
      content:
      application/json:
      schema:
      :  schema key.

## Components Section

The *components* section should define reusable components for the API, such as schemas and security schemes.

1. **schemas**: Objects that define the structure of the data used in the API, such as request and response bodies.
    - Define separate schemas for each distinct data type used in the API, such as "ResponseWrapperName", "
      CommonErrorStructure", and "basicErrorSchema".
2. **securitySchemes**: Objects that define the authentication methods used in the API.
    - Define the "BearerAuth" security scheme as an HTTP authentication method using the bearer scheme.

> ### **Hints** for designing schemas components:
>- Any object that have more than 3 nested level should be defined as a separate schema.
>- Any object that is used in more than one place should be defined as a separate schema.
>

- In our case e.g. basicErrorSchema is used in all responses.

> - Any object that contains more than 7 simple or 3 complex properties should be defined as a separate schema.

## Security Section

The *security* section should define the global security requirements for all API operations. It can be overridden by
specifying different security requirements on the individual operation level.

To require Bearer authentication for all endpoints, define the security requirement as follows:

```
security:
  - BearerAuth: []
```

## Summary

By following this design document, the team can create standard, consistent, and well-structured APIs using the OpenAPI
3.0 specification. Remember to use the given YAML file as an example and refer to this document for guidance on defining
the various sections and components within your APIs.

### YAML REGA Template

```yaml
openapi: 3.0.1
info:
  title:
  description:
  version: '1'
servers:
  - url: http://api-dev.rega.gov.sa/v1/group-name/example-path-1
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
        - groupName
      summary:
      operationId:
      requestBody:
        $ref: "#/components/requestBodies/RequestBodyName"

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

components:

  requestBodies:
    RequestBodyName:
      description:
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/RequestBodySchemaName"

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

  schemas:
    ResponseSchemaName:

    RequestBodySchemaName:

    CommonErrorStructure:
      type: object
      properties:
        SourceAgency:
          type: string
        ErrorType:
          type: string
          enum:
            - BusinessError
            - TechnicalError
        RaisedBy:
          type: string
        Code:
          type: string
        ErrorText:
          type: string
        Insert:
          type: array
          items:
            type: string

    basicErrorSchema:
      type: object
      properties:
        SourceAgency:
          type: string
        ErrorType:
          type: string
          default: TechnicalError
        Code:
          type: string
        ErrorText:
          type: string


  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer

security:
  - BearerAuth: [ ]
```

### References

- [OpenAPI 3.0 Specification](https://swagger.io/specification/)
- [Best Practices in API Design](https://swagger.io/resources/articles/best-practices-in-api-design)