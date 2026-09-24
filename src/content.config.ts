import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        etiket: z.string().optional(), // ör. "1. Ay (Eylül) · 1. Hafta"
        konu: z.string().optional(), // ayın teması
        taslak: z.boolean().optional(), // true: içerik hazırlanıyor, aramalardan gizli
      }),
    }),
  }),
};
