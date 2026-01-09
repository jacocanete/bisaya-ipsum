# Bisaya Ipsum

Lorem Ipsum but Bisaya. For when you need placeholder text that hits different.

## Run it

```bash
bun install
bun run dev
```

Go to http://localhost:3002

## API

```bash
# basic
GET /api/generate

# with options
GET /api/generate?paragraphs=5&curseLevel=yawa

# curse levels: low, medium, high, yawa
```

POST works too:
```json
{
  "paragraphs": 5,
  "curseLevel": "high",
  "sentencesPerParagraph": { "min": 5, "max": 5 }
}
```

## Deploy

Push to main → GitHub Actions builds and pushes to ghcr.io → Pull from Dockge

## Add words

Edit `src/words.ts` and PR it.

---

Made for the Triple B Motherfuckers
