# Design Principles
Since Designing APIs is a creative process, it is important to follow some principles to ensure that the API is well-designed and easy to use and maintain.
While we use OpenAPI specification to define the API, we by default follow the RESTful API design principles, 
what we are including here are some additional principles that are defined by the API design team.

## Swagger File Structure
The Swagger file structure should be organized in a way that is easy to read and understand.
by default, we follow the following structure:
```yaml
openapi: 3.0.1
info:
servers:
paths:
components:
security:
```

### Info Section

The *info* section should contain the following fields:

- **title**: A brief, descriptive title for the API, that consist of the groupName of the task and operation name.
  - Refer to the [Naming Conventions](1_naming.md) for more information.
- **description**: A detailed description of the APIs purpose and functionality.
- **version**: The current version of the Swagger file.
  - See the [Versioning](#versioning) section for more information.

### Server Section

The *servers* section should contain an array of Server Objects, each describing a base URL for the APIs endpoints. For
example:

```yaml
servers:
  - url: https://api.example.com/path
```
Refer to the [Naming Conventions](1_naming.md) for more information.

### Paths Section

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

#### **Parameters** should be defined as follows:

1. **name**: The name of the parameter.
2. **in**: The location of the parameter (e.g., 'path', 'query', 'header', 'cookie').
3. **required**: A boolean value indicating whether the parameter is required, default is `false`.
4. **schema**: A reference to the schema of the parameter.

#### **Responses** should be defined as follows:

1. Keys are the HTTP status code, (`200`,`401`,`404`,`500`), these are the most common status codes and the  ones Apigee must return.
2. Each value is a Response Object, which should contain:
    - **description**: A short description of the response.
    - **content**: A map of media types and their corresponding Response Objects inside
      ```yaml
       application/json:
            schema:
               $ref: '#/components/schemas/ResponseWrapperName'
        ``` 
      
### Components Section

The *components* section should define reusable components for the API, such as schemas and security schemes.

1. **schemas**: Objects that define the structure of the data used in the API, such as request and response bodies.
    - Define separate schemas for each distinct data type used in the API, such as "ResponseWrapperName", "
      CommonErrorStructure", and "basicErrorSchema".
2. **securitySchemes**: Objects that define the authentication methods used in the API.
   - See the [Security](#security) section for more information.

::: warning **Hints** for designing schemas components:
- Any object that have more than 3 nested level should be defined as a separate schema.
- Any object that is used in more than one place should be defined as a separate schema.
In our case e.g. basicErrorSchema is used in all responses.
- Any object that contains more than 7 simple or 3 complex properties should be defined as a separate schema.
:::

## Versioning
The versioning of the API swagger file should follow the [Semantic Versioning](https://semver.org/) guidelines.
The versioning should be done at the Swagger file level, not at the API level.
The version should be defined in the `info` section of the Swagger file.

## Security
The security section should define the security schemes used in the API.
Since we in Apigee use OAuth2.0 for authentication, the security scheme should be defined as follows:
```yaml
securitySchemes:
  OAuth2:
    type: oauth2
    flows:
      clientCredentials:
        tokenUrl: https://api.example.com/oauth/token
        scopes: []
```
::: tip **Note:**
- The `tokenUrl` should be the token endpoint of the OAuth2 server.
- The `scopes` should be an array of strings representing the scopes required for the API.
- Refer to the [OpenAPI Security](https://swagger.io/docs/specification/authentication/oauth2/) for more information.

