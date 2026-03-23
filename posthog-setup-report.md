<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the DevEvent Next.js App Router project. The following changes were made:

- **`instrumentation-client.ts`** (new): Initializes PostHog client-side using the recommended Next.js 15.3+ approach. Includes exception capture for error tracking, a reverse proxy `api_host`, and debug mode in development.
- **`next.config.ts`**: Added reverse proxy rewrites routing `/ingest/*` to PostHog's ingestion endpoint, and set `skipTrailingSlashRedirect: true`.
- **`components/ExploreBtn.tsx`**: Converted to a client component (`"use client"`) and added a `posthog.capture("explore_events_clicked")` call on button click.
- **`components/EventCard.tsx`**: Converted to a client component (`"use client"`) and added a `posthog.capture("event_card_clicked", {...})` call on link click, including `event_title`, `event_slug`, `event_location`, and `event_date` as properties.
- **`.env.local`**: Added `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables.

| Event Name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicked the 'Explore Events' button on the homepage hero section | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicked on a featured event card to view more details | `components/EventCard.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard**: [Analytics basics](https://us.posthog.com/project/352954/dashboard/1388136)
- **Insight**: [Explore Events Clicked (Daily)](https://us.posthog.com/project/352954/insights/5mEQFT0m)
- **Insight**: [Event Card Clicks (Daily)](https://us.posthog.com/project/352954/insights/nTnzLcAd)
- **Insight**: [Event Card Clicks by Title](https://us.posthog.com/project/352954/insights/FcXIAECJ)
- **Insight**: [Explore to Event Card Conversion Funnel](https://us.posthog.com/project/352954/insights/pX3cIqP5)
- **Insight**: [Unique Users Exploring Events](https://us.posthog.com/project/352954/insights/etERZLV4)

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
