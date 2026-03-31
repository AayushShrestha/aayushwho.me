We are building a website for me, Aayush Shrestha.
I am a Stand Up Comedian and also a Software Engineer.
I do many things including Screenwriting, TVC Writing, Direction, etc. But for this website, we are only going to focus on my work as a Stand Up Comedian. Although, we will have separate pages in the website that will be focused on my other works.

The domain is called "aayushwho.me"
And the title of the site should be "AAYUSHWHO"

Primary Goals of the Website:
I want the website to be more than just a landing page. I want this website to be a mechanism to:
1. Showcase my work - Stand Up videos, performances, podcasts, etc.
2. Provide information about my upcoming shows and tours
3. Sell tickets to my shows
4. Sell other artifacts like Merchandises, and Pay-Per-View Specials
5. Provide a way for people to connect with me, and vice versa. i.e. I should also be able to connect with the people.

Additionally,
There will be separate pages in the website that will be focused around my tech work, writing work, direction and production. But we will only tackle it later. For now, we are only building the Stand Up Comedy section of the website, as the primary landing page.

Vibe of the Website:
I want the website to have a raw, grainy, high-iso midnight club vibe. It should feel like a underground, exclusive club. It should feel like a place where people can come together to enjoy comedy and have a good time. It should feel like a place where people can connect with each other.
The colors used in the website should be:
Black, Dark Gray, Dark Navy Blue, and Dark Crimson Red.
Typography: I want bold typography. Big bold sans-serif fonts for title. And classy serif fonts for body.

About my Stand Up.
I started stand up comedy in 2017. I started a comedy group called "Comedy Tuk Tuk". We were the first group to start Stand Up Comedy Open mics in nepal.
My stand up comedy voice is socio-political commentary with aloofness and silliness attached to it.
I have three stand up specials that I am currently performing:
- Mujibaad (A socio political commentary on Nepal)
- Dark, Dirty, and Dangerous (All the dark materials that will never go on the internet)
- Gender In.Equality (A Double Headliner that I do with another comic - Yozana Magar)
Currently, I work with a comedy group called "Laugh and Clap"

My primary form of distribution of Stand Up is my YouTube channel: https://www.youtube.com/@AayushWho
These are my socials
Facebook: https://www.facebook.com/AayushWho/
Twitter: https://x.com/aayush_who
Instagram: https://www.instagram.com/aayush_who/
TikTok: https://www.tiktok.com/@aayush_who
LinkedIn: https://www.linkedin.com/in/aayush-who/

---

## Phase 2 Updates

### Section Order (AIDA Funnel)
The page sections are ordered to match an awareness → action → retention funnel:
1. Hero (hook + CTAs + social icons)
2. Tours (immediate action for primed visitors)
3. Specials (build desire for the work)
4. Showcase (prove the work with video)
5. PPV (upsell the uncut version)
6. Community (retain and deepen the relationship)
7. Merch (secondary revenue)
8. Connectivity / Heckle Box (long tail)

### Hero CTA Configuration
The hero CTAs are configurable via `heroContent` in `src/data/content.ts`.
Change `primaryCTA.href` and `primaryCTA.label` to shift what action you want visitors to take without touching the component.

### Community Platforms
Both Discord and WhatsApp Broadcast Channel exist. Links are stored as placeholders in `communityContent` in `src/data/content.ts` — update them there when ready.
- Discord: `communityContent.discord.inviteUrl`
- WhatsApp: `communityContent.whatsapp.inviteUrl`

### Email Collection
Emails are collected via a form in the Community section. They POST to `/api/subscribe` and are stored at `/data/subscribers.json` (local filesystem, excluded from git).
**Note:** This approach works in development and self-hosted production. Migrate to a database or KV store before deploying to Vercel.

### Copy Direction
All section headings and subheadings live in `sectionCopy` in `src/data/content.ts`.
Tone: second-person, inviting and confident, comedian's voice. Reads like Aayush is talking to the visitor, not describing himself in a press kit.

### Inline Connectivity Nudges
Small YouTube follow nudges are placed at the bottom of the Tours and Showcase sections, pointing visitors to the YouTube channel after they've engaged with that content.
