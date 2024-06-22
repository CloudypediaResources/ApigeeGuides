# Naming Conventions

## Introduction
Naming conventions play a crucial role in maintaining consistency and clarity across the API lifecycle. There are different naming styles, primarily **Camel Case** and **Snake Case**, which are used based on the context, such as Apigee implementations or design.

- **Camel Case:** The first letter of the first word is lowercase, and the first letter of each subsequent word is capitalized (e.g., `camelCaseExample`).
- **Snake Case:** All letters are lowercase, and words are separated by underscores (e.g., `snake_case_example`).

## URL Naming Conventions
URIs follow RFC 3986 specification. This specification simplifies REST API service development and consumption.

All URI components MUST adhere to the following general guidelines.

[ ] Nouns MUST be used, not verbs 
[ ] Resource names MUST be singular for singletons; collections' names MUST be plural
[ ] Only for functional API resources e.g. search, you are allowed to use verbs
[ ] Resource names MUST be lower-case and use only alphanumeric characters
[ ] Avoid using multiple words; where not possible MUST user lower camel case
[ ] Use hyphens to separate words
[ ] Do not use underscores
[ ] Do not use file extensions
[ ] Do not use trailing slashes

Following is a brief description of the URI specific naming convention.
```
<protocol>://<domain>/<namespace>/<api-name>/<version>/<resource|task>?<query-parameters>
```

### Components:
| Component             | Description                                                                                                                                            | Example                                       |
|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| **Scheme**            | Typically `https` or `http`.                                                                                                                           | `https`                                       |
| **Client Domain**     | The domain name of the client.                                                                                                                         | `api.example.com`                             |
| **Namespace**         | The namespace must be a generic name that groups <br> multiple APIs by purpose, value etc.                                                             | `moj`<br/>`/customerManagment`<br>`/opendata` |
| **API Name**          | The name of the API representing the top level offering <br> of the API. This, along with namespace and version, is typically the API proxy base path. | `court-cases`                                 |
| **Version**           | The version of the API.                                                                                                                                | `v1`                                          |
| **Resource/Task**     | The resource or task being accessed.                                                                                                                   | `payment`                                     |
| **Query Parameters**  | .                                                                                                                                                      | `?sort=asc&limit=10`                          |


### Example:
Design a URL for a service for getting information about private contractors from the Ministry of Municipal and Rural Affairs and Housing.

::: danger Incorrect
  `https://api.example.com/momrah/contractors`
:::
::: warning 50% Correct
  `https://api.example.com/v1/momrah/contractors/`
:::
::: tip Correct
  `https://api.example.com/momrah/v1/contractors`
:::
::: tip Correct
  `https://api.example.com/momrah/v1/contractors/private`
:::


## Proxy Naming Conventions
Driven from the URL naming conventions, the proxy name should be a reflection of the API name. 
The proxy name should be unique and should not contain any version information. unless it is a shared proxy with multiple versions.

- **Format:** `<Namespace>-<APIName>`
- **Example:** `momrah-contractors`

> We often prefix the namespace to be all uppercase to make it easier to identify the namespace.
> also we often make the first letter of the API name uppercase to make it easier to read.
> 
> **Example:** `MOMRAH-Contractors`


## Variable Naming Conventions
### In Apigee:
- **Format:** Camel Case
- **Example:** `userId`, `orderTotal`

> What if a variable with prefix like we need to make an object with all proxy request extracted variables?
> - **Format:** Camel Case
> - **Example:** `requestUserId`, `requestOrderTotal`, `proxyRequestUserId`, `proxyRequestOrderTotal`


## Policy Naming Conventions
**Format:** `<PolicyAcronym>-<Description>`
- **Example:** `RF-401Unauthorized`, `AM-BackendRequest`, `EV-ProxyRequest`

### Policy Acronyms:
| Policy                        | Acronyms                            |
|-------------------------------|-------------------------------------|
| Access Control                | AC, AccessControl                   |
| Access Entity                 | AE, AccessEntity                    |
| Assign Message                | AM, Assign, AssignMessage           |
| Basic Authentication          | BA, Encode, Decode, BasicAuth       |
| Concurrent Rate Limit         | CRL                                 |
| Extract Variables             | EV, Extract, Vars, ExtractVariables |
| Flow Callout                  | FC, FlowCallout                     |
| JavaScript Callout            | JS, JSC, JavaScript                 |
| Java Callout                  | JC, Java                            |
| JSON Threat Protection        | JTP, JSONThreat                     |
| JSON to XML                   | J2X, JtoX, JSONtoXML                |
| Key Value Map                 | KVM                                 |
| LDAP                          | LDAP                                |
| Message Logging               | ML, MessageLogging                  |
| Populate Cache                | PC, PopulateCache                   |
| Lookup Cache                  | LC, LookupCache                     |
| Invalidate Cache              | IC, InvalidateCache                 |
| Response Cache                | RC, ResponseCache                   |
| OAuth v1                      | OAuthv1                             |
| OAuth v2                      | OAuthv2                             |
| Python Callout                | Python                              |
| Quota                         | Q, Quota                            |
| Reset Quota                   | RQ                                  |
| Raise Fault                   | RF, Fault, Raise, RaiseFault        |
| Regular Expression Protection | RE, Regex                           |
| SOAP Message Validation       | MV                                  |
| Generate SAML Assertion       | SAML                                |
| Validate SAML Assertion       | SAML                                |
| Extension Callout             | EC, Extension                       |
| Generate JWT                  | JWT                                 |
| Verify JWT                    | JWT                                 |
| Decode JWT                    | JWT                                 |
| Generate JWS                  | JWS                                 |
| Verify JWS                    | JWS                                 |
| Decode JWS                    | JWS                                 |
| Service Callout               | SC                                  |
| Spike Arrest                  | SA, SpikeArrest                     |
| Statistics Collector          | Stats                               |
| Verify API Key                | VAK, VerifyAPIKey                   |
| XML Threat Protection         | XMLTP                               |
| XML to JSON                   | X2J, XtoJ, XML2JSON                 |
| XSL Transform                 | XSL, XSLT                           |


## Shared Flows Naming Conventions
**Format:** `SF-<Description>`
- **Example:** `SF-Common`, `SF-ErrorHandling`, `SF-Logging`

## Use Cases
> TBD
