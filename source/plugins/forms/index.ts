import Forms from './collections/Forms';
import Submissions from './collections/Submissions';
export interface PluginContext {
  api: any;
  collections: { register: (c: any) => void };
  db: any;
  hooks: any;
  i18n: any;
}
export const onInit = async (context: PluginContext) => {
    context.collections.register(Forms);
    context.collections.register(Submissions);
    context.api.post('/submit/:slug', async (req: any, res: any) => {
        const { slug } = req.params;
        const form = await context.db.findOne('forms', { slug });
        if (!form) return res.status(404).json({ error: 'Form not found' });
        const result = await context.db.insert('submissions', { form: form.id, formTitle: form.title, data: req.body, status: 'unread', ipAddress: req.ip });
        context.hooks.emit('forms:new_submission', { form, submission: result });
        return res.json({ success: true, message: form.successMessage || 'Sent successfully' });
    });
};
export default { onInit };
