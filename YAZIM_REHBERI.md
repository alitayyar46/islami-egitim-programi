# Yazım rehberi

Bu site, düz metin (Markdown) dosyalarından kendiliğinden üretilir.
Bir dosyayı değiştirip kaydettiğinde site genellikle birkaç dakika içinde güncellenir.

## Sitedeki adres = dosyanın yeri

| Sitedeki adres | Dosya |
|---|---|
| `/program/eylul/hafta-1/` | `src/content/docs/program/eylul/hafta-1.md` |
| `/program/eylul/` (ay özeti, aylık sınav) | `src/content/docs/program/eylul/index.md` |
| `/kilavuz/`, `/kuran-plani/`, `/puan-sistemi/`, `/yil-sonu/` | `src/content/docs/` içinde aynı adlı `.md` |
| `/hakkinda/`, `/kaynaklar/`, `/gizlilik/` | `src/content/docs/` içinde aynı adlı `.md` |
| Ana sayfa | `src/content/docs/index.mdx` |

Ay klasörleri: `eylul, ekim, kasim, aralik, ocak, subat, mart, nisan, mayis, haziran, temmuz, agustos`.
Adreslerde Türkçe karakter kullanılmaz; sayfaların başlıkları ise doğru Türkçe imlayla yazılır.

`sablonlar/` klasörü boş şablonları içerir. Yayınlanmaz.

## Sayfanın en üstündeki bölüm (frontmatter)

Her dosyanın başında `---` çizgileri arasında bilgi satırları vardır. Çizgilere ve tırnaklara dokunma.

| Satır | Anlamı |
|---|---|
| `title` | Sayfa başlığı |
| `description` | Kısa özet. Arama sonuçlarında ve WhatsApp gibi paylaşımlarda görünür. Her sayfada farklı olmalı. |
| `etiket`, `konu` | Başlığın altındaki bilgi satırında görünür (ay, hafta, ayın teması) |
| `lastUpdated` | "Son güncelleme" tarihi (yıl-ay-gün). Bir sayfada anlamlı değişiklik yaptığında tarihi güncelle. |
| `taslak: true` | İçerik henüz hazır değil. Sayfa arama motorlarından gizlenir, takvimde "Hazırlanıyor" görünür. |

Okuma süresi sayfa metninden kendiliğinden hesaplanır.

## Bir taslak haftayı hazır hale getirmek

1. Dosyayı aç, içeriği `sablonlar/hafta-sablonu.md` düzenine göre doldur.
2. En üstteki şu satırları sil: `taslak: true` ve `badge:` altındaki 3 satır (`badge:`, `text:`, `variant:`).
3. `lastUpdated: 2026-09-24` satırını ekle (tarihi günün tarihiyle değiştir).
4. "İçerik hazırlanıyor" kutusunu sil.

Takvim ve ana sayfadaki "Hazır / Hazırlanıyor" durumu bu değişikliklerden kendiliğinden güncellenir.
Bir ayın **tüm haftaları** bitince ay özeti sayfasında (`index.md`) da aynı şekilde `taslak: true` ve `badge` satırlarını sil.
Emin olamazsan dosyayı Claude'a yaptır; doğru başlıkla hazır dosya verir.

## Kutular

```
:::tip[👪 Aile Etkinliği]
metin
:::
```

`tip` bej, `note` yeşil, `caution` gri kutu verir. Başlığı köşeli parantez içinde değiştirebilirsin.

## Cevabı gizli soru

```
**S1.** Soru metni?

<details>
<summary>Cevabı gör</summary>

Cevap metni.

</details>
```

`<details>` satırlarının üstünde ve altında boş satır bırak.

## İlmihal veya yeni bölüm eklemek

`sablonlar/ilmihal-maddesi.md` dosyasını kopyala, `src/content/docs/ilmihal/` klasörüne koy.
Her sayfada kaynak kutusu bulunsun. İzin yazışmalarını sitede veya bu klasörde değil, kendi arşivinde (ör. Notion) sakla; site herkese açıktır.
Yeni bir bölümün menüde görünmesi için `astro.config.mjs` dosyasına bir satır gerekir; bunu Claude'a yaptır.

## Kendi alan adını bağlamak

Alan adı alıp Cloudflare'de projene bağladıktan sonra `astro.config.mjs` dosyasının başındaki
`SITE` satırını yeni adresle değiştir. Sitemap, robots.txt, kanonik bağlantılar ve paylaşım görseli buradan üretilir.

## Bir şey bozulursa

Cloudflare panelinde **Deployments** sekmesine gir, başarısız yayının kaydındaki hata mesajını kopyala ve Claude'a yapıştır.
Hatalı yayın canlı siteyi bozmaz; önceki çalışan sürüm yayında kalır.
