import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from 'zod';
import { getApiConfig } from "./utils/credentials";
import { fetchProduct, fetchProducts, updateProduct } from "./api/EcommerceApi";
import { updateProductDescription } from "./services/updateProductDescription";

const server = new McpServer({
  name: 'hostinger-ecommerce',
  version: '1.0.0',
  description: 'MCP server for Hostinger Ecommerce solution',
});

server.tool(
  "getProduct",
  "Returns single product data",
  {
    productId: z.string().describe("The ID of the product to retrieve"),
  },
  async ({ productId }) => { 
    try {
      const result = await fetchProduct(productId);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      console.error(`Error fetching product: ${error}`);
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ error }, null, 2),
          },
        ],
      };
    }
  }
);

server.tool(
  "getProducts",
  "Returns a list of products (maximum 25)",
  {
    limit: z.number().optional().default(25).describe("Maximum number of products to return (max 25)"),
    offset: z.number().optional().default(0).describe("Offset for pagination"),
  },
  async ({ limit, offset }) => {
  
    const actualLimit = Math.min(limit, 25);
    
    try {
      const result = await fetchProducts(actualLimit, offset);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error: any) {
      console.error(`Error fetching products: ${error.message}`);   
      
      return {
        content: [
          {
            type: "text",
            text: error.message
          },
        ],
      };
    }
  }
);

server.tool(
  "updateProductDescription",
  "Updates product description",
  {
    productId: z.string().describe("The ID of the product to update"),
    description: z.string().describe("The new product description"),
  },
  async ({ productId, description }) => { 
    try {
      const updatedProduct = await updateProductDescription({ productId, description });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(updatedProduct, null, 2),
          },
        ],
      };
    } catch (error) {
      console.error(`Error updating product: ${error}`);
            
      return {
        content: [
          {
            type: "text",
            text: `Error updating product: ${error}`
          },
        ],
      };
    }
  }
);

async function main() {

  try {
    await getApiConfig();
    console.error("Hostinger Ecommerce MCP Server starting with provided credentials");
  } catch (error: any) {
    console.error(`Warning: ${error.message}`);
    console.error("Continuing with mock data only");
  }
  
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Hostinger Ecommerce MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
}); 