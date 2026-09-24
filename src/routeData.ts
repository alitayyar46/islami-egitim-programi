import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

// "taslak: true" olan sayfalar arama motorlarından gizlenir (noindex).
// Taslaktan çıkarmak için o satırı silmek yeterlidir.
export const onRequest = defineRouteMiddleware((context) => {
  const { entry, head } = context.locals.starlightRoute;
  if (entry.data.taslak) {
    head.push({ tag: 'meta', attrs: { name: 'robots', content: 'noindex' } });
  }
});
