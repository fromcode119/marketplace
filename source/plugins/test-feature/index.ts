/**
 * Test Feature Plugin
 * Framework capability testing
 */

interface PluginContext {
  api: {
    get: (path: string, ...handlers: any[]) => void;
    post: (path: string, ...handlers: any[]) => void;
  };
}

export const onInit = async (context: PluginContext) => {
  console.log('Test Feature Initialized');
  
  context.api.post('/toggle', async (req, res) => {
    return res.json({ success: true, active: req.body.active });
  });
};

export default {
  onInit
};
