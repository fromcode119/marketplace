import ConsentLogs from './collections/ConsentLogs';
export interface PluginContext {
  api: any;
  collections: { register: (c: any) => void };
  db: any;
  hooks: any;
  i18n: any;
}
export const onInit = async (context: PluginContext) => {
    context.collections.register(ConsentLogs);
    context.api.post('/consent', async (req: any, res: any) => {
        const { consents, visitorId } = req.body;
        for (const [type, granted] of Object.entries(consents)) {
            await context.db.insert('consent-logs', { visitorId: visitorId || req.ip, consentType: type, granted: !!granted });
        }
        return res.json({ success: true });
    });
};
export default { onInit };
