// @ts-check
import fs from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import { aylar } from './src/aylar.mjs';

// Sitenin yayın adresi. Kendi alan adını bağladığında YALNIZCA bu satırı değiştir.
// (Kanonik bağlantılar, site haritası, robots.txt ve paylaşım görseli buradan üretilir.)
const SITE = 'https://islami-egitim-programi.pages.dev';

// Frontmatter'ında "taslak: true" yazan sayfalar arama motorlarından gizlenir
// ve site haritasına girmez.
function taslakYollari() {
  const yollar = new Set();
  const kok = new URL('./src/content/docs/program/', import.meta.url);
  if (!fs.existsSync(kok)) return yollar;
  for (const dizin of fs.readdirSync(kok)) {
    const klasor = new URL(`./${dizin}/`, kok);
    if (!fs.statSync(klasor).isDirectory()) continue;
    for (const dosya of fs.readdirSync(klasor)) {
      if (!dosya.endsWith('.md')) continue;
      const metin = fs.readFileSync(new URL(dosya, klasor), 'utf8');
      const ust = metin.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (ust && /^taslak:\s*true\s*$/m.test(ust[1])) {
        const son = dosya === 'index.md' ? '' : `${dosya.replace(/\.md$/, '')}/`;
        yollar.add(`/program/${dizin}/${son}`);
      }
    }
  }
  return yollar;
}
const taslak = taslakYollari();

export default defineConfig({
  site: SITE,
  integrations: [
    sitemap({ filter: (sayfa) => !taslak.has(new URL(sayfa).pathname) }),
    starlight({
      title: 'İslami Eğitim Programı',
      description:
        '11-15 yaş arası çocuklar için düzenli okumayı, düşünmeyi ve öğrenmeyi destekleyen 12 aylık aile içi İslami eğitim programı.',
      defaultLocale: 'root',
      locales: { root: { label: 'Türkçe', lang: 'tr' } },
      favicon: '/favicon.svg',
      customCss: ['./src/styles/tema.css'],
      routeMiddleware: './src/routeData.ts',
      components: {
        Footer: './src/components/Footer.astro',
        PageTitle: './src/components/PageTitle.astro',
      },
      head: [
        { tag: 'meta', attrs: { name: 'theme-color', content: '#F8F6F0', media: '(prefers-color-scheme: light)' } },
        { tag: 'meta', attrs: { name: 'theme-color', content: '#0F1A17', media: '(prefers-color-scheme: dark)' } },
        { tag: 'meta', attrs: { property: 'og:image', content: `${SITE}/og-image.png` } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
        { tag: 'meta', attrs: { property: 'og:image:alt', content: 'İslami Eğitim Programı: 11-15 yaş, 12 ay, 48 hafta' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: `${SITE}/og-image.png` } },
      ],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      sidebar: [
        { label: 'Başlangıç', items: ['kilavuz', 'takvim', 'kuran-plani', 'puan-sistemi'] },
        {
          label: 'Aylık program',
          items: aylar.map(([dir, label]) => ({
            label,
            collapsed: true,
            autogenerate: { directory: `program/${dir}` },
          })),
        },
        { label: 'Değerlendirme', items: ['yil-sonu'] },
        { label: 'Site', items: ['hakkinda', 'kaynaklar', 'gizlilik'] },
      ],
    }),
  ],
});
