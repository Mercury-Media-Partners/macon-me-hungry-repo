import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const businesses = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/businesses" }),
  schema: z.object({

    // ── Identity ──────────────────────────────────────────
    title: z.string(),
    tagline: z.string(),
    category: z.string(),           // e.g. "Dance Club", "Coffee Shop", "Real Estate Agent"
    category_type: z.enum([
      'nightlife',     // Bars, Clubs, Drag Shows, Late Night Eats
      'lifestyle',     // Cafes, Bookstores, Retail, Boutiques
      'wellness',      // Gyms, Barbershops, Spas, Therapists
      'professional',  // Real Estate, Attorneys, Doctors, Tax Pros
    ]),
    operating_mode: z.enum(['day', 'night', 'both']).optional(),
    neighborhood: z.string(),
    vibe: z.string(),

    // ── Monetization Tier ─────────────────────────────────
    tier: z.enum(['free', 'partner', 'promoter', 'professional', 'headliner']).default('free'),

    // ── Contact & Location ────────────────────────────────
    address: z.string(),
    lat: z.number().optional(),     // Required for JSON-LD + future map view
    lng: z.number().optional(),
    hours: z.string(),
    phone: z.string().optional(),
    website: z.string().optional(), // Rendered only for promoter & headliner

    // ── Social Media (Promoter + Headliner only) ──────────
    socials: z.object({
      instagram: z.string().optional(),
      facebook: z.string().optional(),
      twitter: z.string().optional(),
    }).optional(),

    // ── Media ─────────────────────────────────────────────
    heroImage: z.string().optional(),
    gallery_images: z.array(z.string()).max(5).optional(), // Max 5 for Promoter
    video_url: z.string().optional(),                      // YouTube embed — Headliner only

    // ── Events (Promoter: max 3 recurring; Headliner: unlimited) ──
    events: z.array(z.object({
      name: z.string(),
      day: z.string(),              // e.g. "Every Friday"
      time: z.string(),             // e.g. "9pm – 2am"
      description: z.string().optional(),
      ticket_url: z.string().optional(), // Headliner only
      is_recurring: z.boolean().default(true),
    })).optional(),

    // ── Conversion CTAs (Headliner only) ─────────────────
    cta_label: z.string().optional(), // e.g. "Buy Tickets", "Book a Table"
    cta_url: z.string().optional(),

    // ── World Cup Specific ────────────────────────────────
    stadiumMin: z.number(),
    rating: z.number(),
    world_cup_ready: z.boolean().default(true),
    has_patio: z.boolean().default(false),
    bilingual_staff: z.boolean().default(false), // Never default to true — only set explicitly for a listing once actually confirmed.

    // ── Stakeholder Impact Metrics ────────────────────────
    jobs_supported: z.number().optional(),
    local_sourcing: z.string().optional(),
    established: z.number().optional(),

    // ── Drink / Menu / Service Highlights ────────────────
    order_highlights: z.array(z.object({
      item: z.string(),
      note: z.string()
    })).optional(),

    // ── Transit Access ────────────────────────────────────
    transit_station: z.string().optional(),
    transit_time_en: z.string().optional(),
    transit_time_es: z.string().optional(),

    // ── SEO ───────────────────────────────────────────────
    meta_title: z.string().optional(),
    meta_desc: z.string().optional(),
    is_demo: z.boolean().optional(),
  }),
});

const landingPages = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/landing_pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    hero: z.object({
      eyebrow: z.string(),
      title_lines: z.array(z.string()),
      title_highlight: z.string(),
      subtitle: z.string(),
      countdown_label: z.string(),
      countdown_date: z.string(),
      countdown_closes_in: z.string(),
      countdown_final: z.string(),
      cta_claim: z.string(),
      cta_pricing: z.string(),
      stats: z.array(z.object({
        value: z.string(),
        label: z.string()
      }))
    }),
    marquee: z.object({
      label: z.string()
    }),
    how_it_works: z.object({
      title: z.string(),
      steps: z.array(z.object({
        icon: z.string(),
        step: z.string(),
        heading: z.string(),
        body: z.string()
      }))
    }),
    pricing: z.object({
      section_label: z.string(),
      title_line_1: z.string(),
      title_line_2: z.string(),
      title_highlight: z.string(),
      billing_monthly: z.string(),
      billing_annual: z.string(),
      billing_savings: z.string(),
      period_mo: z.string(),
      period_yr: z.string(),
      free_label: z.string(),
      founded_label: z.string(),
      annual_billed_note: z.string(),
      save_label: z.string(),
      trust_bar: z.array(z.object({
        icon: z.string(),
        title: z.string(),
        desc: z.string()
      })),
      tiers: z.array(z.object({
        id: z.string(),
        name: z.string(),
        subtitle: z.string(),
        monthly: z.number().nullable(),
        annual: z.number().nullable(),
        annualMonthly: z.number().nullable(),
        badge: z.string().nullable(),
        badgeClass: z.string(),
        borderClass: z.string(),
        mobileOrder: z.number(),
        headingClass: z.string(),
        description: z.string(),
        whoFor: z.string().nullable().optional(),
        features: z.array(z.string()),
        lockedFeatures: z.array(z.string()).nullable().optional(),
        roiProof: z.string().nullable().optional(),
        cta: z.string(),
        ctaClass: z.string(),
        ctaGradient: z.string().nullable().optional()
      }))
    }),
    testimonial: z.object({
      section_label: z.string(),
      title: z.string(),
      body: z.string(),
      cta: z.string()
    }),
    faq: z.object({
      section_label: z.string(),
      title: z.string(),
      items: z.array(z.object({
        q: z.string(),
        a: z.string(),
        category: z.string().optional()
      }))
    }),
    form: z.object({
      section_label: z.string(),
      title: z.string(),
      description: z.string(),
      success_message: z.string(),
      submit_btn: z.string(),
      submit_btn_submitting: z.string(),
      select_tier_placeholder: z.string(),
      select_billing_placeholder: z.string(),
      labels: z.object({
        business_name: z.string(),
        contact_name: z.string(),
        email: z.string(),
        phone: z.string(),
        tier: z.string(),
        billing: z.string(),
        message: z.string()
      }),
      tiers: z.array(z.object({
        value: z.string(),
        label: z.string()
      })),
      billing_options: z.array(z.object({
        value: z.string(),
        label: z.string()
      }))
    }),
    final_cta: z.object({
      title: z.string(),
      subtitle: z.string(),
      cta: z.string(),
      closes_label: z.string(),
      deadline_label: z.string()
    }),
    sticky_bar: z.object({
      label: z.string(),
      cta: z.string()
    })
  })
});

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    lastModifiedDate: z.coerce.date(),
    author: z.string(),
    authorAvatar: z.string().optional(),
    category: z.enum(['nightlife', 'lifestyle', 'wellness', 'world-cup', 'news']),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    external_url: z.string().url().optional(),
    format: z.enum(['article', 'video', 'social_post']).default('article'),
    lang: z.enum(['en', 'es']),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
  })
});

const attractions = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/attractions" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    tagline: z.string(),
    category: z.string(),           // e.g. "Public Park", "Museum"
    category_type: z.enum(['outdoors', 'culture', 'landmark']).default('outdoors'),
    operating_mode: z.enum(['day', 'night', 'both']).default('day'),
    neighborhood: z.string(),
    vibe: z.string().default('Relaxing'),
    tier: z.enum(['free', 'promoter', 'headliner']).default('free'),
    address: z.string(),
    lat: z.number().optional(),
    lng: z.number().optional(),
    hours: z.string(),
    phone: z.string().optional(),
    website: z.string().optional(),
    socials: z.object({
      instagram: z.string().optional(),
      facebook: z.string().optional(),
      twitter: z.string().optional(),
    }).optional(),
    heroImage: image().optional(),
    gallery_images: z.array(z.string()).optional(),
    stadiumMin: z.number(),
    rating: z.number(),
    world_cup_ready: z.boolean().default(true),
    has_patio: z.boolean().default(false),
    bilingual_staff: z.boolean().default(false),
    isPetFriendly: z.boolean().default(true),
    hasPlayground: z.boolean().default(false),
    hasFountains: z.boolean().default(false),
    established: z.number().optional(),
    // ── Transit Access ────────────────────────────────────
    transit_station: z.string().optional(),
    transit_time_en: z.string().optional(),
    transit_time_es: z.string().optional(),

    meta_title: z.string().optional(),
    meta_desc: z.string().optional(),
  })
});

const jobs = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/jobs" }),
  schema: z.object({
    title: z.string(),
    business_slug: z.string(), // Links to business markdown filename
    job_type: z.enum(['full-time', 'part-time', 'contract', 'freelance']),
    wage_range: z.string().optional(),
    apply_url: z.string(), // URL or mailto:
    pub_date: z.coerce.date(),
    expiration_date: z.coerce.date().optional(),
  })
});

export const collections = {
  'businesses': businesses,
  'landing_pages': landingPages,
  'blog': blog,
  'attractions': attractions,
  'jobs': jobs
};

