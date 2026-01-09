import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "hono/bun";
import {
  generateIpsum,
  generateText,
  generateParagraph,
  generateSentence,
  type GenerateOptions,
} from "./generator";
import { allWords } from "./words";

const app = new Hono();

// Enable CORS for all routes
app.use("/*", cors());

// Serve static files from public directory
app.use("/*", serveStatic({ root: "./public" }));

// API Routes
const api = new Hono();

// Health check
api.get("/health", (c) => {
  return c.json({ status: "ok", message: "Chada ra! 🔥" });
});

// Get all word categories
api.get("/words", (c) => {
  return c.json({
    success: true,
    data: allWords,
    counts: {
      curseWords: allWords.curseWords.length,
      curseAdjectives: allWords.curseAdjectives.length,
      exclamations: allWords.exclamations.length,
      subjects: allWords.subjects.length,
      connectors: allWords.connectors.length,
      total: Object.values(allWords).flat().length,
    },
  });
});

// Get specific word category
api.get("/words/:category", (c) => {
  const category = c.req.param("category") as keyof typeof allWords;

  if (!allWords[category]) {
    return c.json(
      {
        success: false,
        error:
          "Invalid category. Use: subjects, verbs, adjectives, curseWords, locations, etc.",
      },
      404,
    );
  }

  return c.json({
    success: true,
    category,
    data: allWords[category],
    count: allWords[category].length,
  });
});

// Generate ipsum - main endpoint
api.get("/generate", (c) => {
  const paragraphs = parseInt(c.req.query("paragraphs") || "3");
  const curseLevel = (c.req.query("curseLevel") ||
    "medium") as GenerateOptions["curseLevel"];
  const format = c.req.query("format") || "json"; // json, text, html

  // Validate
  if (paragraphs < 1 || paragraphs > 50) {
    return c.json(
      {
        success: false,
        error: "Paragraphs must be between 1 and 50, bay!",
      },
      400,
    );
  }

  if (!["low", "medium", "high", "yawa"].includes(curseLevel!)) {
    return c.json(
      {
        success: false,
        error: "Invalid curseLevel. Use: low, medium, high, yawa",
      },
      400,
    );
  }

  const options: GenerateOptions = { paragraphs, curseLevel };
  const result = generateIpsum(options);

  if (format === "text") {
    return c.text(result.join("\n\n"));
  }

  if (format === "html") {
    const html = result.map((p) => `<p>${p}</p>`).join("\n");
    return c.html(html);
  }

  return c.json({
    success: true,
    options: { paragraphs, curseLevel },
    data: {
      paragraphs: result,
      text: result.join("\n\n"),
    },
  });
});

// Generate single paragraph
api.get("/generate/paragraph", (c) => {
  const curseLevel = (c.req.query("curseLevel") ||
    "medium") as GenerateOptions["curseLevel"];
  const paragraph = generateParagraph({ curseLevel });

  return c.json({
    success: true,
    data: paragraph,
  });
});

// Generate single sentence
api.get("/generate/sentence", (c) => {
  const curseLevel = (c.req.query("curseLevel") ||
    "medium") as GenerateOptions["curseLevel"];
  const sentence = generateSentence({ curseLevel });

  return c.json({
    success: true,
    data: sentence,
  });
});

// POST endpoint for more control
api.post("/generate", async (c) => {
  try {
    const body = await c.req.json();
    const {
      paragraphs = 3,
      curseLevel = "medium",
      sentencesPerParagraph,
      wordsPerSentence,
    } = body;

    const options: GenerateOptions = {
      paragraphs: Math.min(Math.max(paragraphs, 1), 50),
      curseLevel,
      sentencesPerParagraph,
      wordsPerSentence,
    };

    const result = generateIpsum(options);

    return c.json({
      success: true,
      options,
      data: {
        paragraphs: result,
        text: result.join("\n\n"),
      },
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: "Invalid request body, buang!",
      },
      400,
    );
  }
});

// Mount API routes
app.route("/api", api);

// Fallback to index.html for SPA
app.get("*", serveStatic({ path: "./public/index.html" }));

const port = parseInt(process.env.PORT || "3002");

console.log(`
🔥 Bisaya Ipsum API running!
   
   Local:   http://localhost:${port}
   API:     http://localhost:${port}/api
   
   Endpoints:
   GET  /api/health              - Health check
   GET  /api/words               - All word categories
   GET  /api/words/:category     - Specific category
   GET  /api/generate            - Generate ipsum
   GET  /api/generate/paragraph  - Single paragraph
   GET  /api/generate/sentence   - Single sentence
   POST /api/generate            - Generate with options
   
   Query params for /api/generate:
   - paragraphs (1-50, default: 3)
   - curseLevel (low|medium|high|yawa, default: medium)
   - format (json|text|html, default: json)
   
   Yawa ka man pud! 😂
`);

export default {
  port,
  fetch: app.fetch,
};
