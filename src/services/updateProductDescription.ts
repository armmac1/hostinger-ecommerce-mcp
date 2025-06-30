import { fetchProduct, updateProduct, Product } from '../api/EcommerceApi';

/**
 * Updates a product's description
 * @param productId - The ID of the product to update
 * @param description - The new description for the product
 * @returns The updated product data from the API
 */
export const updateProductDescription = async ({
  productId, 
  description
}: {
  productId: string, 
  description: string
}): Promise<Product> => {
  try {
    // First get the product using id
    const productData = await fetchProduct(productId);
    const product = productData.product;
    
    // Format description - if it already has HTML tags, use as is
    const formattedDescription = description;
    
    // Create a clean product object with only the allowed fields
    const updatedProduct = {
      title: product.title,
      subtitle: product.subtitle,
      ribbon_text: product.ribbon_text,
      description: formattedDescription,
      status: product.status,
      purchasable: product.purchasable,
      options: product.options || [],
      type: { 
        id: product.type?.id,
        value: product.type?.value
      },
      collections: product.collections ? product.collections.map((c: any) => ({ id: c.id, title: c.title })) : [],
      additional_info: product.additional_info || [],
      custom_fields: product.custom_fields || [],
      variants: product.variants ? product.variants.map((variant: any) => {
        return {
          id: variant.id,
          title: variant.title,
          sku: variant.sku,
          manage_inventory: variant.manage_inventory,
          inventory_quantity: variant.inventory_quantity,
          track_low_stock: variant.track_low_stock,
          image_url: variant.image_url,
          weight: variant.weight,
          prices: variant.prices ? variant.prices.map((price: any) => ({
            currency_code: price.currency_code,
            amount: price.amount,
            sale_amount: price.sale_amount
          })) : [],
          options: variant.options || [],
          digital_assets: variant.digital_assets || [],
          booking_event: variant.booking_event,
          gift_card: variant.gift_card
        };
      }) : [],
      thumbnail: product.thumbnail,
      // Clean media array to remove id and order properties
      media: product.media ? product.media.map((mediaItem: any) => ({
        url: mediaItem.url,
        type: mediaItem.type,
        display_slot: mediaItem.display_slot
      })) : [],
      site_product_selection: product.site_product_selection,
      seo_settings: product.seo_settings ? {
        slug: product.seo_settings.slug,
        description: product.seo_settings.description,
        ogImageAlt: product.seo_settings.ogImageAlt,
        ogImagePath: product.seo_settings.ogImagePath,
        ogImageOrigin: product.seo_settings.ogImageOrigin
      } : undefined,
      related_products: product.related_products || []
    };
    
    // Use EcommerceApi.updateProduct to update the product
    return updateProduct(productId, updatedProduct as Partial<Product>);
  } catch (error) {
    console.error('Error in updateProductDescription:', error);
    throw error;
  }
};

/**
 * Creates an updated product object with a new description
 * This function is no longer used directly, but kept for reference
 */
export const buildUpdatedProductWithDescription = (
  product: Product, 
  description: string
): Partial<Product> => {
  // Format description with HTML paragraph tags if it doesn't already have them
  const formattedDescription = description.startsWith('<') ? description : `<p>${description}</p>`;
  
  // Create a comprehensive product object that matches the API requirements
  return {
    // Include all required fields from the original product
    title: product.title,
    subtitle: product.subtitle,
    ribbon_text: product.ribbon_text,
    description: formattedDescription,
    status: product.status,
    purchasable: product.purchasable,
    options: product.options,
    variants: product.variants,
    
    // Include additional fields that are present in the API request
    type: product.type,
    collections: product.collections,
    additional_info: product.additional_info || [],
    custom_fields: product.custom_fields || [],
    thumbnail: product.thumbnail,
    media: product.media || [],
    site_product_selection: product.site_product_selection,
    seo_settings: product.seo_settings,
    related_products: product.related_products || []
  };
};