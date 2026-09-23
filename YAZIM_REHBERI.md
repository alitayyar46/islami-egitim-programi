# Yazım rehberi

Bu site, düz metin (Markdown) dosyalarından kendiliğinden üretilir.
Bir dosyayı değiştirip kaydettiğinde site 1-3 dakika içinde güncellenir.

## Klasörler

```
src/content/docs/
  index.mdx             Ana sayfa
  kilavuz.md            Kullanım kılavuzu
  takvim.md             Yıllık takvim (durum sütununu buradan güncelle)
  kuran-plani.md        48 haftalık Kur'an planı
  puan-sistemi.md       Puan ve ödül sistemi
  yil-sonu.md           Yıl sonu sınavı
  program/
    ay-01-eylul/        Her ayın klasörü
      index.md          Ay özeti ve aylık sınav
      hafta-1.md ...    Her haftanın kendi dosyası
sablonlar/              Boş şablonlar (yayınlanmaz)
```

## Bir haftanın içeriğini doldurmak

1. `src/content/docs/program/ay-04-aralik/hafta-2.md` gibi dosyayı aç.
2. Üstteki `badge:` satırlarını sil (menüdeki "Taslak" etiketi kalkar).
3. "İçerik hazırlanıyor" kutusunu sil, `sablonlar/hafta-sablonu.md` içindeki bölümleri ekle.
4. Takvimde (`takvim.md`) ilgili ayın durumunu `🔧 Hazırlanıyor` yerine `✅ Hazır` yap.

## Kutular

```
:::tip[👪 Aile Etkinliği]
metin
:::
```

`tip` altın, `note` yeşil, `caution` kahverengi kutu verir. Başlığı köşeli parantez içinde değiştirebilirsin.

## Cevabı gizli soru

```
**S1.** Soru metni?

<details>
<summary>Cevabı gör</summary>

Cevap metni.

</details>
```

(`<details>` satırlarının üstünde ve altında boş satır bırak.)

## İlmihal veya yeni bölüm eklemek

`sablonlar/ilmihal-maddesi.md` dosyasını kopyala, `src/content/docs/ilmihal/` klasörüne koy.
Her sayfanın sonunda kaynak kutusu bulunsun. İzin yazışmalarını sitede veya bu klasörde değil, kendi arşivinde (ör. Notion) sakla; site herkese açıktır.
Yeni bir bölümün menüde görünmesi için `astro.config.mjs` dosyasına bir satır gerekir; bunu Claude'a yaptır.

## Bir şey bozulursa

Cloudflare panelinde **Deployments** sekmesine gir, başarısız yayının kaydındaki hata mesajını kopyala ve Claude'a yapıştır.
Önceki çalışan sürüme tek tıkla geri dönebilirsin (**Rollback**).
