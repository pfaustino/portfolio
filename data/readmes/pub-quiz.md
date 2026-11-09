# The Snug

A question bank and live pub-quiz table for quizmasters. Pick licensed rounds, write your own, line up tonight, then open the floor. Players join on their phones over a peer link to the host machine.

## This slice

- Licensed seed from the [Open Trivia Database](https://opentdb.com/) (CC BY-SA 4.0), stored in `src/data/opentdb-pack.json` — **5255 questions across 614 rounds**.
- Browse and add seeded rounds or individual questions to tonight’s board.
- Create, reorder, and save host-authored rounds (this browser only, separate from the licensed pack).
- Open the floor: phones join with a short code. Game traffic is a WebRTC data channel to the host. Answers never go to players.
- OpenTDB credits show wherever licensed questions appear. The app does not call OpenTDB during a night.

Out of scope for now: scoring, buzzers, accounts, marketplace, sharing host rounds, AI-generated questions, scraping, live OpenTDB sync.

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:4371](http://localhost:4371).

This is a Next.js app on the same stack as MyLittleSong: **Vercel + Neon Postgres**. Local `npm run dev` uses in-memory signaling and does not need a database. Production live tables need `DATABASE_URL` (Neon) so host and phones share a room across serverless instances.

On quiz night, open the Vercel URL (or run this machine with `npm run build` then `npm start`). Phones join the QR on the host screen.

To rebuild the licensed pack from OpenTDB (rate-limited; do this only when reseeding, not on quiz night):

```bash
npm run seed:opentdb
```

## Licence

Application code in this repository is yours to use as part of the project.

Seeded questions remain under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) from Open Trivia Database. Host-authored rounds are private to the host and are not mixed into that pack.
