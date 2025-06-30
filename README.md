# Hostinger Ecommerce MCP

This is a Model Context Protocol (MCP) server for interacting with the Hostinger Ecommerce API.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

3. MCP server configuration:

* MacOS (zsh):
```json
"hostinger-ecommerce": {
      "command": "node",
      "args": [
        "<path/to/hostinger-ecommerce-mcp/build/index.js>",
        "--jwt",
        "<your-jwt-token>",
        "--store-id",
        "<your-store-id>"
      ]
    }
```



* Windows (cmd):
```json
{
  "mcpServers": {
    "hostinger-ecommerce": {
      "command": "cmd",
      "args": [
        "/c",
        "node",
        "<path/to/hostinger-ecommerce-mcp/build/index.js>",
        "--jwt",
        "<your-jwt-token>",
        "--store-id",
        "<your-store-id>"
      ]
    }
  }
}
```

## Available Tools

The MCP server provides the following tools:

1. **getProduct** - Retrieves a single product by ID
   - Parameter: `productId` - The ID of the product to retrieve

2. **getProducts** - Retrieves a list of products (maximum 25)
   - Parameters: 
     - `limit` (optional, default: 25) - Maximum number of products to return
     - `offset` (optional, default: 0) - Offset for pagination

3. **updateProductDescription** - Updates a product's description
   - Parameters:
     - `productId` - The ID of the product to update
     - `description` - The new product description