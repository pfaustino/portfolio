# MyLittleSong

A song that sounds like your family. Parents enter a few details about their child, pick an occasion and a genre, and get a personal song they can play, keep, and send as a gift.

**Live:** https://www.mylittlesong.app

## What it does

A parent walks through a short wizard: name, age, how to pronounce the name, family and pets, occasion, likes, tone (sweet, silly, or adventurous), length, and genre. The app writes original lyrics, then turns them into an MP3. Songs land in a library. From there the owner can play one, download it, or share it.

- A guest can start with an email and no password. That account gets one free **0:30** clip. One free clip per email, and one guest generation per IP address.
- A full song is about **3:00** and spends one credit. Packs are 1 song ($4.99), 3 songs ($11.99), and 10 songs ($29.99), paid with PayPal.
- Guests stay on the short clip. Creating an account unlocks full songs, the library, and gifts.
- A gift is a song plus a private link. The recipient creates an account to listen, and can make songs of their own.
- Each song can also have a public link anyone can open, and up to 50 one-person private invites.
- Ages 18 and up are written as a song from a parent to a grown child. Younger ages stay a children's song. Lyrics stay family-friendly either way.
- Admin accounts skip the credit check. Daily caps still apply to everyone else: 40 lyric drafts and 12 finished songs.

Occasions and genres live in `data/occasions.json` and `data/genres.json`.

## Run

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

Without API keys, lyrics and music use the stub providers. The stub song is `public/stub-song.mp3`, and password-reset links are printed in the server log.

Set `LYRICS_PROVIDER=openrouter` and `MUSIC_PROVIDER=openrouter` when you want real lyrics and audio. Lyrics go through OpenRouter (`OPENROUTER_MODEL`, default Claude Haiku). Music uses Google Lyria on OpenRouter: Lyria 3 Clip for the 30-second song, Lyria 3 Pro for the full song.

Local accounts and songs are stored in `data/app.db` (Node's built-in SQLite). On Vercel, set `DATABASE_URL` to a Neon Postgres URL. `AUTH_SECRET` must be at least 16 characters.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Next.js on port 3000 |
| `npm run check` | lint, typecheck, unit tests, and production build |
| `npm test` | Vitest |
| `npm run test:e2e` | Playwright |

## Environment

See `.env.example`. The ones that change behavior:

| Variable | Purpose |
|----------|---------|
| `LYRICS_PROVIDER` | `stub` or `openrouter` |
| `MUSIC_PROVIDER` | `stub` or `openrouter` |
| `OPENROUTER_API_KEY` | Required when either provider is `openrouter` |
| `AUTH_SECRET` | Signs sessions and hashes guest IP limits |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Seeds the admin account |
| `MAIL_PROVIDER` | `stub` logs reset links; `resend` sends them |
| `PAYPAL_CLIENT_ID` / `PAYPAL_CLIENT_SECRET` / `PAYPAL_ENV` | Song-credit checkout. Use `sandbox` first |
| `DATABASE_URL` | Postgres on Vercel. Leave empty locally |
| `PUBLIC_URL` | Absolute site URL used in email and OpenRouter referer |
