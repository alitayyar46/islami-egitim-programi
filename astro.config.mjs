// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Yeni bir ay eklemek gerekirse buraya tek satır eklenir.
const aylar = [
  ['ay-01-eylul', '1. Ay · Eylül'],
  ['ay-02-ekim', '2. Ay · Ekim'],
  ['ay-03-kasim', '3. Ay · Kasım'],
  ['ay-04-aralik', '4. Ay · Aralık'],
  ['ay-05-ocak', '5. Ay · Ocak'],
  ['ay-06-subat', '6. Ay · Şubat'],
  ['ay-07-mart', '7. Ay · Mart'],
  ['ay-08-nisan', '8. Ay · Nisan'],
  ['ay-09-mayis', '9. Ay · Mayıs'],
  ['ay-10-haziran', '10. Ay · Haziran'],
  ['ay-11-temmuz', '11. Ay · Temmuz'],
  ['ay-12-agustos', '12. Ay · Ağustos'],
];

export default defineConfig({
  integrations: [
    starlight({
      title: 'İslami Eğitim Programı',
      description:
        '11-15 yaş arası çocuklar için 12 aylık aile içi İslami eğitim programı: haftalık dersler, Kur\'an ezberi, aylık sınavlar.',
      defaultLocale: 'root',
      locales: { root: { label: 'Türkçe', lang: 'tr' } },
      favicon: '/favicon.svg',
      customCss: ['./src/styles/tema.css'],
      components: { Footer: './src/components/Footer.astro' },
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      sidebar: [
        {
          label: 'Başlangıç',
          items: ['kilavuz', 'takvim', 'kuran-plani', 'puan-sistemi'],
        },
        {
          label: 'Aylık program',
          items: aylar.map(([dir, label]) => ({
            label,
            collapsed: true,
            autogenerate: { directory: `program/${dir}` },
          })),
        },
        { label: 'Değerlendirme', items: ['yil-sonu'] },
      ],
    }),
  ],
});
