import { z } from 'zod';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const asinRegex = /^[A-Z0-9]{10}$/;

const optionalUrl = z.union([z.string().url(), z.literal('')]).transform((value) => value || '');

export const adminLoginSchema = z.object({
  password: z.string().min(1).max(200),
  rememberMe: z.boolean().optional().default(false),
});

export const articleStatusSchema = z.enum(['draft', 'published']);

export const adminArticleSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z.string().min(3).max(200).regex(slugRegex),
  excerpt: z.string().min(20).max(400),
  content: z.string().min(20),
  author: z.enum(['Renee K.', 'Maury B.']),
  category: z.enum(['Beliefs', 'Practices', 'History', 'Culture', 'FAQ', 'Comparison']),
  featuredImageUrl: optionalUrl,
  tags: z.string().max(300).optional().default(''),
  status: articleStatusSchema.default('draft'),
  publishedDate: z.string().regex(dateRegex),
});

export const adminProductSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(500).optional().default(''),
  tradition: z.string().min(2).max(80),
  priceRange: z.string().max(60).optional().default(''),
  amazonAsin: z.union([z.string().regex(asinRegex), z.literal('')]).transform((value) => value || ''),
  amazonSearchQuery: z.string().max(200).optional().default(''),
  imageUrl: optionalUrl,
  isEditorsPick: z.boolean().optional().default(false),
  editorsPickAuthor: z.union([z.enum(['Renee K.', 'Maury B.']), z.literal('')]).optional().default(''),
  sortOrder: z.coerce.number().int().min(0).max(9999).default(0),
}).superRefine((value, ctx) => {
  if (!value.amazonAsin && !value.amazonSearchQuery.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Provide an Amazon ASIN or an Amazon search query.',
      path: ['amazonSearchQuery'],
    });
  }

  if (value.isEditorsPick && !value.editorsPickAuthor) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Editor pick author is required when Editor\'s Pick is enabled.',
      path: ['editorsPickAuthor'],
    });
  }
});

export const publicContactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  subject: z.string().max(200).optional().default(''),
  message: z.string().min(10).max(4000),
  website: z.string().max(0).optional().default(''),
});

export const trackEventSchema = z.object({
  page_path: z.string().min(1).max(300),
  event_type: z.enum(['pageview', 'shop_click', 'outbound_click']),
  referrer: z.string().max(2000).optional(),
});

export const idParamSchema = z.object({
  id: z.string().min(1).max(100),
});

export const statusFilterSchema = z.object({
  status: articleStatusSchema.optional(),
});

export const messageFilterSchema = z.object({
  status: z.enum(['all', 'read', 'unread']).optional().default('all'),
});

export const analyticsRangeSchema = z.object({
  range: z.enum(['7d', '30d', '90d', 'all']).optional().default('30d'),
});
