// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Carlos Z. Bent';
export const SITE_DESCRIPTION = "Welcome to Carlos Z. Bent's personal space on the web. Come in to find info, projects and contact";

export const MIXPANEL_ID = import.meta.env.PUBLIC_MIXPANEL_ID

export const CURRENT_DATE = new Date().toLocaleDateString("en-US", { timeZone: 'America/New_York' })
export const SUPABASE_ANALYTICS_TABLE = import.meta.env.PUBLIC_SUPABASE_ANALYTICS_TABLE