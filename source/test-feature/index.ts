/**
 * Test Feature Plugin
 * Framework capability testing
 */

interface PluginContext {
  api: {
    register: (method: string, path: string, handler: (req: any, res: any) => Promise<any>) => void;
  };
}

export const onInit = async (context: PluginContext) => {
  console.log('Test Feature Initialized');
  
  context.api.register('POST', '/api/test/toggle', async (req, res) => {
    return { success: true, active: req.body.active };
  });
};

export default {
  onInit
};
