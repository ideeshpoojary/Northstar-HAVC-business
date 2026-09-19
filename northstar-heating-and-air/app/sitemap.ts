import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
  return [{ url: host ? `https://${host}` : "https://northstar.example", changeFrequency: "monthly", priority: 1 }]
}
