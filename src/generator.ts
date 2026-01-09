import {
  subjects, verbs, futureVerbs, negativeVerbs, objects, adjectives,
  locations, timeExpressions, curseWords, curseAdjectives, exclamations,
  questionWords, connectors, intensifiers, reactions, slang, reasons, memes
} from './words';

// Helper to get random item from array
function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Helper to get N random unique items from array
function randomN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, arr.length));
}

// Helper to maybe include something (returns empty string if not)
function maybe(arr: string[], probability = 0.5): string {
  return Math.random() < probability ? random(arr) : '';
}

// Capitalize first letter
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Join words and clean up extra spaces
function join(...parts: string[]): string {
  return parts.filter(p => p).join(' ').replace(/\s+/g, ' ').trim();
}

// ===========================================
// SENTENCE TEMPLATES
// ===========================================

// Basic statement: "Ang tawo nagkaon og pagkaon sa balay"
function basicStatement(): string {
  const templates = [
    // Standard SVO
    () => join(random(subjects), random(verbs), random(objects), maybe(locations, 0.6)),
    // With intensifier
    () => join(random(subjects), random(verbs), random(objects), random(intensifiers)),
    // Location first
    () => join(random(locations) + ',', random(subjects), random(verbs), random(objects)),
    // Simple SV
    () => join(random(subjects), random(verbs), maybe(locations, 0.7)),
  ];
  return random(templates)();
}

// Statement with time: "Gahapon ang bata natulog sa kwarto"
function timeStatement(): string {
  const templates = [
    () => join(random(timeExpressions), random(subjects), random(verbs), random(objects)),
    () => join(random(subjects), random(verbs), random(objects), random(timeExpressions)),
    () => join(random(timeExpressions), random(subjects), random(verbs), random(locations)),
  ];
  return random(templates)();
}

// Adjective statement: "Ang babaye gwapa kaayo"
function adjectiveStatement(): string {
  const templates = [
    () => join(random(subjects), random(adjectives), random(intensifiers)),
    () => join(random(adjectives), random(intensifiers), random(subjects)),
    () => join(random(subjects), random(adjectives), random(intensifiers), random(locations)),
  ];
  return random(templates)();
}

// Exclamation + adjective: "Ay sus, ang pagkaon lami kaayo!"
function exclamationStatement(): string {
  const extraSubjects = [...subjects, 'ang pagkaon', 'ang lugar', 'ang panahon', 'ang problema', 'ang trabaho'];
  const templates = [
    () => join(random(exclamations) + ',', random(extraSubjects), random(adjectives), random(intensifiers)),
    () => join(random(exclamations) + '!', random(extraSubjects), random(adjectives)),
    () => join(random(exclamations) + ',', random(adjectives), random(intensifiers), 'ang tanan'),
  ];
  return random(templates)() + '!';
}

// Question: "Ngano ang lalaki naghilak?"
function questionStatement(): string {
  const templates = [
    () => join(random(questionWords), random(subjects), random([...verbs, ...futureVerbs])),
    () => join(random(questionWords), random(subjects), random(verbs), random(objects)),
    () => join(random(questionWords), random(subjects), random(adjectives), random(intensifiers)),
    () => join(random(questionWords), random(verbs), random(subjects), random(locations)),
    () => join(random(questionWords), 'ang', random(objects).replace('og ', '')),
  ];
  return random(templates)() + '?';
}

// Negative with reason: "Ang driver dili molakaw kay hubog"
function negativeStatement(): string {
  const templates = [
    () => join(random(subjects), random(negativeVerbs), random(reasons)),
    () => join(random(subjects), random(negativeVerbs), random(locations)),
    () => join(random(negativeVerbs), random(subjects), random(reasons)),
    () => join(random(timeExpressions), random(subjects), random(negativeVerbs)),
  ];
  return random(templates)();
}

// Future plan: "Ugma mokaon ko og manok sa merkado"
function futurePlan(): string {
  const templates = [
    () => join(random(timeExpressions), random(futureVerbs), 'ko', random(objects), random(locations)),
    () => join(random(futureVerbs), 'ko', random(objects), random(timeExpressions)),
    () => join(random(subjects), random(futureVerbs), random(objects), random(timeExpressions)),
    () => join(random(timeExpressions), random(subjects), random(futureVerbs), random(locations)),
  ];
  return random(templates)();
}

// Curse exclamation: "Yawa! Ang init init kaayo!"
function curseExclamation(): string {
  const templates = [
    () => join(random(curseWords) + '!', random(subjects), random(adjectives), random(intensifiers)),
    () => join(random(curseWords), 'ning', random(['tawhana', 'lugara', 'butanga', 'trabahoa']) + ',', random(curseAdjectives), random(intensifiers)),
    () => join(random(curseWords) + ',', random(subjects), random(verbs), 'na pud'),
    () => join('mao ning', random(curseWords) + ',', random(negativeVerbs), random(intensifiers)),
    () => join(random(curseWords), 'ka!', random(subjects), random(curseAdjectives)),
    () => join(random(curseWords) + '!', random(curseAdjectives), random(intensifiers), 'ning', random(['tawhana', 'butanga', 'lugara'])),
    () => join(random(exclamations) + ',', random(curseWords), random(intensifiers) + '!', random(subjects), random(curseAdjectives)),
  ];
  return random(templates)() + '!';
}

// Compound sentence: "Subject verb pero subject negative"
function compoundStatement(): string {
  const templates = [
    () => join(random(subjects), random(verbs), random(connectors), random(subjects), random(negativeVerbs)),
    () => join(random(subjects), random(verbs), random(objects), random(connectors), random(negativeVerbs), random(reasons)),
    () => join(random(subjects), random(adjectives), random(connectors), random(subjects), random(adjectives)),
    () => join(random(timeExpressions), random(subjects), random(verbs), random(connectors), 'karon', random(negativeVerbs)),
  ];
  return random(templates)();
}

// Slang/casual: "Uy bay, chada kaayo ang party gahapon!"
function casualStatement(): string {
  const casualSubjects = ['ang party', 'ang event', 'ang storya', 'ang vibes', 'ang food', 'ang lugar', 'ang music', 'ang tropa'];
  const templates = [
    () => join(random(['uy', 'oy', 'hoy', 'ay']), random(slang) + ',', random([...adjectives, 'chada', 'kuyaw', 'grabe']), random(intensifiers), random(casualSubjects)),
    () => join(random(slang) + ',', random(reactions), random(intensifiers)),
    () => join(random(['uy', 'oy', 'hoy']), random(slang) + ',', random(subjects), random(adjectives), random(intensifiers)),
    () => join(random(slang) + '!', random(exclamations) + ',', random(casualSubjects), random(adjectives)),
  ];
  return random(templates)() + '!';
}

// Reaction: "Mao na, sige lang bay"
function reactionStatement(): string {
  const templates = [
    () => join(random(reactions) + ',', random(reactions), random(slang)),
    () => join(random(reactions) + ',', random(exclamations), random(intensifiers)),
    () => join(random(reactions), random(slang) + ',', random(reactions)),
    () => join(random(exclamations) + ',', random(reactions), random(intensifiers)),
  ];
  return random(templates)();
}

// Location focus: "Sa merkado, ang tindero nagbaligya og isda"
function locationStatement(): string {
  const templates = [
    () => join(random(locations) + ',', random(subjects), random(verbs), random(objects)),
    () => join(random(subjects), random(verbs), random(locations), random(timeExpressions)),
    () => join(random(locations), random(adjectives), random(intensifiers), random(timeExpressions)),
  ];
  return random(templates)();
}

// Comparison/opinion: "Mas adjective pa ang subject kaysa subject"
function comparisonStatement(): string {
  const templates = [
    () => join('mas', random(adjectives), 'pa', random(subjects), 'kaysa', random(subjects)),
    () => join(random(subjects), 'mas', random(adjectives), 'kaysa', random(locations)),
    () => join('mas', random(adjectives), random(subjects), random(connectors), random(subjects), random(adjectives)),
  ];
  return random(templates)();
}

// Storytelling opener: "Mao ni ang storya, subject verb..."
function storyOpener(): string {
  const templates = [
    () => join(random(['mao ni', 'mao to', 'mura nig', 'pareha rag']), random(['ang storya', 'ang nahitabo', 'ang problema', 'ang tinuod']) + ',', random(subjects), random(verbs), random(objects)),
    () => join(random(['mao ni', 'mao to']), random(['ang storya', 'ang problema']) + ':', random(subjects), random(negativeVerbs), random(reasons)),
  ];
  return random(templates)();
}

// Famous Bisaya memes
function memeQuote(): string {
  const meme = random(memes);
  const addName = Math.random() > 0.5;
  const names = ['Jonathan', 'Dodong', 'Inday', 'Noy', 'Dong', 'Day', 'Pare', 'Bay'];

  if (addName && !meme.includes('dunk it')) {
    return meme + ', ' + random(names);
  }
  return meme;
}

// NEW: Object-focused sentence
function objectStatement(): string {
  const templates = [
    () => join(random(subjects), 'nagdala', random(objects), random(locations)),
    () => join('naa koy', random(objects).replace('og ', ''), random(locations)),
    () => join(random(subjects), 'nagpalit', random(objects), random(timeExpressions)),
    () => join('asa ang', random(objects).replace('og ', '') + '?'),
    () => join(random(subjects), 'nagkuha', random(objects), 'para', random(subjects)),
  ];
  return random(templates)();
}

// NEW: Reason-focused sentence
function reasonStatement(): string {
  const templates = [
    () => join(random(subjects), random(verbs), random(reasons)),
    () => join(random(negativeVerbs), random(subjects), random(reasons)),
    () => join(random(reasons) + ',', random(subjects), random(negativeVerbs)),
    () => join(random(exclamations) + ',', random(reasons), random(intensifiers)),
  ];
  return random(templates)();
}

// NEW: Connector-heavy compound
function connectorStatement(): string {
  const templates = [
    () => join(random(subjects), random(verbs), random(connectors), random(subjects), random(verbs), random(connectors), random(adjectives)),
    () => join(random(connectors), random(subjects), random(verbs) + ',', random(subjects), random(negativeVerbs)),
    () => join(random(subjects), random(adjectives), random(connectors), random(negativeVerbs), random(reasons)),
  ];
  return random(templates)();
}

// NEW: Intensifier-heavy sentence
function intensifierStatement(): string {
  const templates = [
    () => join(random(subjects), random(adjectives), random(intensifiers), random(intensifiers)),
    () => join(random(exclamations) + ',', random(adjectives), random(intensifiers), random(intensifiers), random(subjects)),
    () => join(random(subjects), random(verbs), random(intensifiers), random(intensifiers), random(locations)),
  ];
  return random(templates)() + '!';
}

// NEW: Curse adjective focused
function curseAdjectiveStatement(): string {
  const templates = [
    () => join(random(subjects), random(curseAdjectives), random(intensifiers)),
    () => join(random(curseWords) + '!', random(curseAdjectives), 'kaayo', random(subjects)),
    () => join('ning', random(subjects).replace('ang ', '') + ',', random(curseAdjectives), random(intensifiers)),
    () => join(random(exclamations) + ',', random(subjects), random(curseAdjectives), random(reasons)),
  ];
  return random(templates)() + '!';
}

// NEW: Question with object
function objectQuestion(): string {
  const templates = [
    () => join(random(questionWords), random(subjects), random(verbs), random(objects)),
    () => join('asa', random(objects).replace('og ', 'ang ')),
    () => join(random(questionWords), random(subjects), random(futureVerbs), random(objects)),
    () => join('kinsa', random(verbs), random(objects), random(locations)),
  ];
  return random(templates)() + '?';
}

// NEW: Time + Future combination
function futureTimeStatement(): string {
  const templates = [
    () => join(random(timeExpressions), random(subjects), random(futureVerbs), random(objects), random(locations)),
    () => join(random(subjects), random(futureVerbs), random(locations), random(timeExpressions)),
    () => join('kung', random(timeExpressions) + ',', random(subjects), random(futureVerbs), random(objects)),
  ];
  return random(templates)();
}

// NEW: Negative verb with connector
function negativeConnectorStatement(): string {
  const templates = [
    () => join(random(subjects), random(negativeVerbs), random(connectors), random(reasons)),
    () => join(random(connectors), random(subjects), random(negativeVerbs) + ',', random(subjects), random(verbs)),
    () => join(random(subjects), random(verbs), random(connectors), random(negativeVerbs)),
  ];
  return random(templates)();
}

// ===========================================
// SENTENCE GENERATOR
// ===========================================

export interface GenerateOptions {
  paragraphs?: number;
  sentencesPerParagraph?: { min: number; max: number };
  curseLevel?: 'low' | 'medium' | 'high' | 'yawa';
}

const defaultOptions: Required<GenerateOptions> = {
  paragraphs: 3,
  sentencesPerParagraph: { min: 4, max: 7 },
  curseLevel: 'medium'
};

// Sentence generators with weights based on curse level
const sentenceGenerators = {
  basic: basicStatement,
  time: timeStatement,
  adjective: adjectiveStatement,
  exclamation: exclamationStatement,
  question: questionStatement,
  negative: negativeStatement,
  future: futurePlan,
  curse: curseExclamation,
  compound: compoundStatement,
  casual: casualStatement,
  reaction: reactionStatement,
  location: locationStatement,
  comparison: comparisonStatement,
  story: storyOpener,
  meme: memeQuote,
  // New generators
  object: objectStatement,
  reason: reasonStatement,
  connector: connectorStatement,
  intensifier: intensifierStatement,
  curseAdj: curseAdjectiveStatement,
  objectQ: objectQuestion,
  futureTime: futureTimeStatement,
  negativeConn: negativeConnectorStatement,
};

// Weights for each sentence type based on curse level
const sentenceWeights: Record<string, Record<string, number>> = {
  low: {
    basic: 18, time: 12, adjective: 12, exclamation: 8, question: 8,
    negative: 6, future: 8, curse: 2, compound: 6, casual: 6,
    reaction: 4, location: 6, comparison: 3, story: 3, meme: 4,
    object: 10, reason: 6, connector: 6, intensifier: 4, curseAdj: 1,
    objectQ: 6, futureTime: 8, negativeConn: 5,
  },
  medium: {
    basic: 14, time: 10, adjective: 10, exclamation: 8, question: 6,
    negative: 6, future: 6, curse: 10, compound: 6, casual: 8,
    reaction: 4, location: 5, comparison: 3, story: 3, meme: 6,
    object: 8, reason: 6, connector: 6, intensifier: 5, curseAdj: 6,
    objectQ: 5, futureTime: 6, negativeConn: 5,
  },
  high: {
    basic: 4, time: 2, adjective: 3, exclamation: 5, question: 2,
    negative: 3, future: 2, curse: 28, compound: 2, casual: 15,
    reaction: 5, location: 1, comparison: 1, story: 2, meme: 18,
    object: 2, reason: 3, connector: 2, intensifier: 8, curseAdj: 20,
    objectQ: 1, futureTime: 2, negativeConn: 2,
  },
  yawa: {
    basic: 1, time: 1, adjective: 1, exclamation: 3, question: 1,
    negative: 2, future: 1, curse: 35, compound: 1, casual: 18,
    reaction: 5, location: 0, comparison: 0, story: 1, meme: 25,
    object: 1, reason: 2, connector: 1, intensifier: 10, curseAdj: 28,
    objectQ: 0, futureTime: 1, negativeConn: 1,
  }
};

// Pick a random sentence type based on weights
function pickSentenceType(curseLevel: string): keyof typeof sentenceGenerators {
  const weights = sentenceWeights[curseLevel];
  const total = Object.values(weights).reduce((a, b) => a + b, 0);
  let rand = Math.random() * total;

  for (const [type, weight] of Object.entries(weights)) {
    rand -= weight;
    if (rand <= 0) {
      return type as keyof typeof sentenceGenerators;
    }
  }

  return 'basic';
}

export function generateSentence(options: GenerateOptions = {}): string {
  const opts = { ...defaultOptions, ...options };
  const sentenceType = pickSentenceType(opts.curseLevel);
  let sentence = sentenceGenerators[sentenceType]();

  // Ensure proper capitalization
  sentence = capitalize(sentence);

  // Add punctuation if missing
  if (!/[.!?]$/.test(sentence)) {
    sentence += Math.random() > 0.8 ? '!' : '.';
  }

  return sentence;
}

export function generateParagraph(options: GenerateOptions = {}): string {
  const opts = { ...defaultOptions, ...options };
  const { min, max } = opts.sentencesPerParagraph;
  const sentenceCount = Math.floor(Math.random() * (max - min + 1)) + min;

  const sentences: string[] = [];
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateSentence(options));
  }

  return sentences.join(' ');
}

export function generateIpsum(options: GenerateOptions = {}): string[] {
  const opts = { ...defaultOptions, ...options };
  const paragraphs: string[] = [];

  for (let i = 0; i < opts.paragraphs; i++) {
    paragraphs.push(generateParagraph(options));
  }

  return paragraphs;
}

export function generateText(options: GenerateOptions = {}): string {
  return generateIpsum(options).join('\n\n');
}
