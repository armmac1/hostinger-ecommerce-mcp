// Define API config interface
export interface ApiConfig {
  jwt: string;
  storeId: string;
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const result: Record<string, string> = {};
  
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, '');
    const value = args[i + 1];
    result[key] = value;
  }
  
  return result;
}

// Get API configuration from command line arguments
export async function getApiConfig(): Promise<ApiConfig> {
  const args = parseArgs();
  const jwt = args.jwt;
  const storeId = args['store-id'];
  
  if (!jwt || !storeId) {
    throw new Error('Missing required arguments: --jwt and/or --store-id');
  }
  
  return { jwt, storeId };
}