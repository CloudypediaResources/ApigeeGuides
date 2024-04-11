# EV-ExtractVariables Policy Notes
Helpful notes for using extract variables policy with apigee


- you can set a datatype for the extracted variable, should be used when we have non-string values for the possible types in the policy like float
- you can overwrite variables if needed
- any ignored unresolved variables will be transformed to an empty string
- the clearPayload attribute in the source could be used for more security or at least speed in a sense that we don't keep the original request anymore only the values extracted from it (should only be used for very large requests as it doesn't affect smaller ones positively)
- you can match multiple query parameters
- you can match multiple paths and very specific paths
