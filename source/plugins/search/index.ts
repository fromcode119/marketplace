export interface PluginContext {
  api: any;
  collections: { register: (c: any) => void };
  db: any;
  hooks: any;
  i18n: any;
}
export const onInit = async (context: PluginContext) => {
    context.api.get('/query', async (req: any, res: any) => {
        const { q } = req.query;
        if (!q || q.length < 2) return res.json({ results: [] });
        const [pages, posts] = await Promise.all([
            context.db.find('cms-pages', { where: { title: { contains: q, mode: 'insensitive' } }, limit: 5 }),
            context.db.find('posts', { where: { title: { contains: q, mode: 'insensitive' } }, limit: 5 })
        ]);
        const results = [
            ...pages.map((p: any) => ({ title: p.title, url: `/${p.slug}`, type: 'Page' })),
            ...posts.map((p: any) => ({ title: p.title, url: `/blog/${p.slug}`, type: 'Post' }))
        ];
        return res.json({ results });
    });
};
export default { onInit };
