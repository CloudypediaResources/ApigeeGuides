
# APIGEE Deployment Guide

## Table of Contents
- [Overview](#overview)
- [Environment Setup](#environment-setup)
    - [KVMs](#kvms)
        - [Creating a KVM](#creating-a-kvm)
        - [Adding data to a KVM](#adding-data-to-a-kvm)
        - [Using a KVM in an API proxy](#using-a-kvm-in-an-api-proxy)
    - [Target Servers](#target-servers)
        - [Creating a Target Server](#creating-a-target-server)
        - [Using a Target Server in an API proxy](#using-a-target-server-in-an-api-proxy)
    - [Virtual Hosts](#virtual-hosts)
        - [Using a Virtual Host in an API proxy](#using-a-virtual-host-in-an-api-proxy)
- [Downloading the Proxy Bundle](#downloading-the-proxy-bundle)
- [Deploying the API Proxy](#deploying-the-api-proxy)


## Overview

This guide provides a step-by-step process for deploying your API proxies with Apigee, covering everything from preparing your proxies for deployment. By following this guide, you'll streamline your deployment process and reduce the risk of errors and downtime.

Assuming basic knowledge of Apigee and API development, this guide is for those with access to an Apigee account and permission to deploy API proxies to target environments.

## Environment Setup

Environment setup and configuration are crucial as improper configuration can lead to issues and errors during proxy deployment or uploading the proxy bundle to your APIGEE instance. Begin by defining the environment configuration needed for your API deployment, which might include KVMs, Target Servers, and Virtual hosts.

### KVMs

KVM (Key Value Map) in Apigee is a secure and scalable storage mechanism for runtime data storage and retrieval. It's used for storing configuration data or shared state information accessible by multiple API proxies or components within an API proxy, like API keys, access tokens, and caching frequently accessed data.

#### Creating a KVM

1. Log in to Apigee and navigate to "Develop" > "Key Value Maps".
2. Click "Create" to create a new KVM.
3. Enter a name, description (optional), environment (test or production), and type (encrypted or unencrypted).
4. Click "Create".

#### Adding data to a KVM

1. Open the KVM.
2. Click "Add Entry" to add a new key-value pair.
3. Enter the key and value for your data.
4. Click "Save".

#### Using a KVM in an API proxy

1. Open the API proxy.
2. Add a "Key Value Map Operations" policy.
3. Configure the policy with the "Action", "Map Identifier", and "Key".

### Target Servers

A target server in Apigee is an endpoint to which an API proxy forwards requests. It can be configured with different protocols, headers, timeouts, and other properties.

#### Creating a Target Server

1. Navigate to APIs > Environment Configuration > Target Servers.
2. Click "New Target Server".
3. Enter the name, host, and port.
4. Click "Save".

#### Using a Target Server in an API proxy

1. Open the API proxy and its target endpoint configuration file.
2. Add the target server configuration inside the "HTTPTargetConnection" element.

### Virtual Hosts

Virtual hosts in Apigee map incoming API requests to the appropriate API proxy based on the hostname or IP address, supporting SSL/TLS encryption by associating an SSL/TLS certificate.

#### Using a Virtual Host in an API proxy

1. Open the API proxy and select the proxy endpoint.
2. In the configuration file, add a "VirtualHost" element with the name of the virtual host.

## Downloading the Proxy Bundle

To move your API proxy from the DEV environment to the SIT:

1. Navigate to APIs in Apigee and select the proxy.
2. Select "Download revision" from the "Project" dropdown.
3. A download for the proxy bundle should start.

## Deploying the API Proxy

To deploy the proxy bundle in the SIT APIGEE instance:

1. Navigate to APIs and click "+API Proxy".
2. Choose "Proxy Bundle" and proceed with the wizard.
3. Choose the downloaded proxy bundle (.zip file) and rename if necessary.

Ensure the API is deployed in the correct environment and the virtual host is correctly configured in the ProxyEndpoint XML file.
