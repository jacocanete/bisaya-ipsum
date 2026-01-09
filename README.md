# 🔥 Bisaya Ipsum

> Yawa ka man pud! Lorem Ipsum pero Bisaya style, bay!

A Bisaya/Cebuano placeholder text generator with a REST API. Built with Bun and Hono.

![Bisaya Ipsum](https://img.shields.io/badge/Made%20with-Bisaya-FF006E?style=for-the-badge)
![Bun](https://img.shields.io/badge/Bun-🥟-000?style=for-the-badge)

## ✨ Features

- 🔥 Generate random Bisaya placeholder text
- 😂 Adjustable curse level (low, medium, high, yawa!)
- 📡 REST API with JSON, text, and HTML output
- ⚡ Built with Bun for speed
- 🌐 Static site works without API (GitHub Pages compatible)

## 🚀 Quick Start

### Prerequisites

Install [Bun](https://bun.sh):

```bash
curl -fsSL https://bun.sh/install | bash
```

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/bisaya-ipsum.git
cd bisaya-ipsum

# Install dependencies
bun install

# Start development server
bun run dev
```

Open http://localhost:3000 🔥

## 📡 API Endpoints

### Generate Ipsum

```bash
# Generate 3 paragraphs (default)
GET /api/generate

# With options
GET /api/generate?paragraphs=5&curseLevel=high&format=json

# Query Parameters:
# - paragraphs: 1-50 (default: 3)
# - curseLevel: low | medium | high | yawa (default: medium)
# - format: json | text | html (default: json)
```

### Generate Single Paragraph

```bash
GET /api/generate/paragraph?curseLevel=medium
```

### Generate Single Sentence

```bash
GET /api/generate/sentence?curseLevel=yawa
```

### Get Words

```bash
# All word categories
GET /api/words

# Specific category
GET /api/words/curseWords
GET /api/words/funnyWords
GET /api/words/expressions
GET /api/words/commonWords
GET /api/words/fillers
```

### POST with Options

```bash
POST /api/generate
Content-Type: application/json

{
  "paragraphs": 5,
  "curseLevel": "high",
  "sentencesPerParagraph": { "min": 3, "max": 6 },
  "wordsPerSentence": { "min": 5, "max": 12 }
}
```

## 🌐 Deployment

### Option 1: Railway / Render / Fly.io (Full API)

1. Push to GitHub
2. Connect your repo to Railway/Render/Fly.io
3. Set build command: `bun install`
4. Set start command: `bun run start`
5. Set port: `3000` (or use `PORT` env var)

**Railway:**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway login
railway init
railway up
```

**Fly.io:**
```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Deploy
fly launch
fly deploy
```

### Option 2: GitHub Pages (Static Only)

The frontend works without the API using client-side generation!

1. Go to your repo Settings → Pages
2. Set source to `main` branch, `/public` folder
3. Save and wait for deployment

Or use GitHub Actions:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

### Option 3: Docker

```dockerfile
FROM oven/bun:1

WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .
EXPOSE 3000

CMD ["bun", "run", "start"]
```

```bash
docker build -t bisaya-ipsum .
docker run -p 3000:3000 bisaya-ipsum
```

## 📁 Project Structure

```
bisaya-ipsum/
├── src/
│   ├── index.ts      # API server (Hono)
│   ├── generator.ts  # Ipsum generation logic
│   └── words.ts      # Bisaya word lists
├── public/
│   └── index.html    # Frontend (works standalone)
├── package.json
└── README.md
```

## 🔧 Development

```bash
# Run with hot reload
bun run dev

# Run production
bun run start

# Build (optional)
bun run build
```

## 🤝 Contributing

Want to add more Bisaya words? PRs welcome!

1. Fork the repo
2. Add words to `src/words.ts`
3. Submit a PR

### Word Categories

- **curseWords**: Yawa, buang, giatay... (the fun stuff 😂)
- **funnyWords**: Chada, lami, nindot, gwapa...
- **expressions**: Ay sus, mao na, wa koy paki...
- **commonWords**: Kaon, tulog, balay, trabaho...
- **fillers**: Nga, sa, ang, og, ug...

## 📄 License

MIT License - Gamiton kung gusto nimo, bay!

---

Made with 💛 for all the Bisaya worldwide!

*Pastilan, nindot kaayo ni nga project!* 🇵🇭
