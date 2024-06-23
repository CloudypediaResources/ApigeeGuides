# Development Guidelines
In this section, we will discuss the guidelines for API development.
In order to ensure consistency and quality across the APIs, we have defined a set of guidelines that should be followed by all developers.

# Implementation Lifecycle
When developing APIs, it is important to follow a structured approach to ensure that the APIs are developed in a consistent manner.

1. Create a Proxy
2. Apply the security policy
3. Apply the Traffic Management policy (if applicable)
4. Add Proxy Flows 
5. Add Target Endpoints
6. Set up request/response validation and mediation policies.
7. Apply fault handling policies
8. Test the API using a dev environment or Mocks
9. Deploy the API to the test environment

## 1. Create a Proxy
When creating a new API, 
the first step is to create a proxy. 
A proxy acts as a facade for the backend service and is responsible for routing requests to the appropriate target endpoint.

## 2. Apply the security policy
Once the proxy is created, We need to apply the security policy to the proxy.
Since Apigee supports a wide range of security policies, we would take the most common cases usually required by the clients.

### OAuth 2.0 Client Credentials

### API Key Verification

### Basic Authentication

