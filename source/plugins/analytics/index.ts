import SiteEvents from './collections/SiteEvents';
export interface PluginContext {
  api: any;
  collections: { register: (c: any) => void };
  db: any;
  hooks: any;
  i18n: any;
}
export const onInit = async (context: PluginContext) => {
    context.collections.register(SiteEvents);
    context.hooks.on('analytics:track', async ({ event, category, metadata, visitorId }: any) => {
        try {
            await context.db.insert('site-events', { eventName: event, category, metadata, visitorId });
        } catch (e) {
            console.error('[Analytics] Failed to log event:', event);
        }
    });
    context.hooks.on('frontend:head', async ({ req, settings }: any) => {
        const gaId = settings.get('ga_measurement_id');
        if (!gaId) return '';
        return `<script async src="https://www.googletagmanager.com/gtag/js?id=${gaId}"></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${gaId}');</script>`;
    });
};
export default { onInit };
