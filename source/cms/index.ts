/**
 * CMS Plugin
 * Core content management functionality
 */

export interface PluginContext {
  api: {
    register: (method: string, path: string, handler: (req: any, res: any) => Promise<any>) => void;
  };
  collections: {
    register: (slug: string, config: any) => void;
  };
}

export const onInit = async (context: PluginContext) => {
  console.log('CMS Plugin Initialized');
  
  // Register API endpoints
  context.api.register('GET', '/api/cms/status', async (req, res) => {
    return { status: 'ok', version: '1.3.2' };
  });
};

export const onEnable = async (context: PluginContext) => {
  console.log('CMS Plugin Enabled');
};

const plugin = {
  onInit,
  onEnable
};

export default plugin;
