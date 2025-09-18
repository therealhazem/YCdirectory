// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import "server-only"
import { defineLive } from "next-sanity/live";
import { client } from './client'

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    // Use stable API version
    // https://www.sanity.io/docs/api-versioning
    apiVersion: '2024-01-01'
  }),
  // Enable live updates for all queries
  // enabled: false,//////////
  // Silence the serverToken warning
  serverToken: false,
  // Silence the browserToken warning
  browserToken: false
});
