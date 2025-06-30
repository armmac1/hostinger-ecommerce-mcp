import { z } from 'zod';
import { getApiConfig } from "../utils/credentials";

export const ProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string().nullable(),
  ribbon_text: z.string().nullable(),
  description: z.string(),
  status: z.string(),
  purchasable: z.boolean(),
  store_id: z.string().optional(),
  media: z.array(z.any()).optional(),
  thumbnail: z.string().nullable().optional(),
  options: z.array(z.any()),
  variants: z.array(z.any()),
  collections: z.array(z.any()).optional(),
  type_id: z.string().optional(),
  type: z.object({ id: z.string(), value: z.string() }).optional(),
  tags: z.array(z.any()).optional(),
  site_product_selection: z.any().nullable().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  deleted_at: z.string().nullable().optional(),
  metadata: z.any().nullable().optional(),
  order: z.number().optional(),
  additional_info: z.array(z.any()).optional(),
  seo_settings: z.object({
    slug: z.string(),
    description: z.string().optional()
  }).optional(),
  page_settings: z.any().nullable().optional(),
  slug: z.string().optional(),
  custom_fields: z.array(z.any()).optional(),
  related_products: z.array(z.any()).optional()
});

export type Product = z.infer<typeof ProductSchema>;

const API_BASE_URL = 'https://api-ecommerce.hostinger.com/admin';

export async function fetchProduct(productId: string): Promise<any> {
  const { jwt, storeId } = await getApiConfig();
  
  const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
    headers: {
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9',
      'priority': 'u=1, i',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'x-correlation-id': crypto.randomUUID(),
      'x-ecommerce-id': storeId,
      'cookie': `jwt=${jwt}`
    },
    referrer: 'https://ecommerce.hostinger.com/',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: null,
    method: 'GET',
    mode: 'cors',
    credentials: 'include'
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

export async function fetchProducts(limit: number = 25, offset: number = 0): Promise<any> {
  const { jwt, storeId } = await getApiConfig();
  

  const url = `${API_BASE_URL}/products?order=DESC&sort_by=created_at&limit=${limit}&offset=${offset}`;
  const requestConfig: RequestInit = {
    headers: {
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9',
      'priority': 'u=1, i',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'x-ecommerce-id': storeId,
      'cookie': `jwt=${jwt}`
    },
    referrer: 'https://ecommerce.hostinger.com/',
    referrerPolicy: 'strict-origin-when-cross-origin' as ReferrerPolicy,
    method: 'GET',
    mode: 'cors' as RequestMode,
    credentials: 'include' as RequestCredentials
  };
  
  try {
    const response = await fetch(url, requestConfig);
    
    console.error('Response status:', response.status, response.statusText);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error(`Error in fetchProducts: ${error.message}`);
    throw error;
  }
}

export async function updateProduct(productId: string, productData: Partial<Product>): Promise<any> {
  const { jwt, storeId } = await getApiConfig();
  
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      headers: {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        'priority': 'u=1, i',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'x-correlation-id': crypto.randomUUID(),
        'x-ecommerce-id': storeId,
        'cookie': `jwt=${jwt}`
      },
      referrer: 'https://ecommerce.hostinger.com/',
      referrerPolicy: 'strict-origin-when-cross-origin',
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(productData)
    });

    
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}