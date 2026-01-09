import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { cors } from 'hono/cors';
import { generateIpsum, generateParagraph, generateSentence, type GenerateOptions } from '../src/generator';
import { allWords } from '../src/words';

export const config = {
  runtime: 'edge',
};

const app = new Hono().basePath('/api');

app.use('/*', cors());

// Health check
app.get('/health', (c) => {
  return c.json({ status: 'ok', message: 'Chada ra! 🔥' });
});

// Get all word categories
app.get('/words', (c) => {
  return c.json({
    success: true,
    data: allWords,
    counts: {
      curseWords: allWords.curseWords.length,
      funnyWords: allWords.curseAdjectives.length,
      expressions: allWords.exclamations.length,
      commonWords: allWords.subjects.length,
      fillers: allWords.connectors.length,
      total: Object.values(allWords).flat().length
    }
  });
});

// Get specific word category
app.get('/words/:category', (c) => {
  const category = c.req.param('category') as keyof typeof allWords;

  if (!allWords[category]) {
    return c.json({
      success: false,
      error: 'Invalid category. Use: subjects, verbs, adjectives, curseWords, etc.'
    }, 404);
  }

  return c.json({
    success: true,
    category,
    data: allWords[category],
    count: allWords[category].length
  });
});

// Generate ipsum - main endpoint
app.get('/generate', (c) => {
  const paragraphs = parseInt(c.req.query('paragraphs') || '3');
  const curseLevel = (c.req.query('curseLevel') || 'medium') as GenerateOptions['curseLevel'];
  const format = c.req.query('format') || 'json';

  if (paragraphs < 1 || paragraphs > 50) {
    return c.json({
      success: false,
      error: 'Paragraphs must be between 1 and 50, bay!'
    }, 400);
  }

  if (!['low', 'medium', 'high', 'yawa'].includes(curseLevel!)) {
    return c.json({
      success: false,
      error: 'Invalid curseLevel. Use: low, medium, high, yawa'
    }, 400);
  }

  const options: GenerateOptions = { paragraphs, curseLevel };
  const result = generateIpsum(options);

  if (format === 'text') {
    return c.text(result.join('\n\n'));
  }

  if (format === 'html') {
    const html = result.map(p => `<p>${p}</p>`).join('\n');
    return c.html(html);
  }

  return c.json({
    success: true,
    options: { paragraphs, curseLevel },
    data: {
      paragraphs: result,
      text: result.join('\n\n')
    }
  });
});

// Generate single paragraph
app.get('/generate/paragraph', (c) => {
  const curseLevel = (c.req.query('curseLevel') || 'medium') as GenerateOptions['curseLevel'];
  const paragraph = generateParagraph({ curseLevel });

  return c.json({
    success: true,
    data: paragraph
  });
});

// Generate single sentence
app.get('/generate/sentence', (c) => {
  const curseLevel = (c.req.query('curseLevel') || 'medium') as GenerateOptions['curseLevel'];
  const sentence = generateSentence({ curseLevel });

  return c.json({
    success: true,
    data: sentence
  });
});

// POST endpoint
app.post('/generate', async (c) => {
  try {
    const body = await c.req.json();
    const {
      paragraphs = 3,
      curseLevel = 'medium',
      sentencesPerParagraph,
    } = body;

    const options: GenerateOptions = {
      paragraphs: Math.min(Math.max(paragraphs, 1), 50),
      curseLevel,
      sentencesPerParagraph,
    };

    const result = generateIpsum(options);

    return c.json({
      success: true,
      options,
      data: {
        paragraphs: result,
        text: result.join('\n\n')
      }
    });
  } catch (error) {
    return c.json({
      success: false,
      error: 'Invalid request body, buang!'
    }, 400);
  }
});

export const GET = handle(app);
export const POST = handle(app);
