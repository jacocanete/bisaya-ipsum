import { describe, test, expect } from 'bun:test';
import { generateSentence, generateParagraph, generateIpsum } from './generator';
import {
  subjects, verbs, futureVerbs, negativeVerbs, objects, adjectives,
  locations, timeExpressions, curseWords, curseAdjectives, exclamations,
  questionWords, connectors, intensifiers, reactions, slang, reasons, memes,
  allWords
} from './words';

// Helper to generate many sentences and collect all text
function generateManyTexts(count: number, curseLevel: 'low' | 'medium' | 'high' | 'yawa' = 'yawa'): string {
  const texts: string[] = [];
  for (let i = 0; i < count; i++) {
    texts.push(generateParagraph({ curseLevel, sentencesPerParagraph: { min: 10, max: 15 } }));
  }
  return texts.join(' ');
}

// Check if a word appears in the generated text
function wordAppears(word: string, text: string): boolean {
  // Handle multi-word phrases
  return text.toLowerCase().includes(word.toLowerCase());
}

describe('Word Lists', () => {
  test('all word categories should have entries', () => {
    expect(subjects.length).toBeGreaterThan(0);
    expect(verbs.length).toBeGreaterThan(0);
    expect(futureVerbs.length).toBeGreaterThan(0);
    expect(negativeVerbs.length).toBeGreaterThan(0);
    expect(objects.length).toBeGreaterThan(0);
    expect(adjectives.length).toBeGreaterThan(0);
    expect(locations.length).toBeGreaterThan(0);
    expect(timeExpressions.length).toBeGreaterThan(0);
    expect(curseWords.length).toBeGreaterThan(0);
    expect(curseAdjectives.length).toBeGreaterThan(0);
    expect(exclamations.length).toBeGreaterThan(0);
    expect(questionWords.length).toBeGreaterThan(0);
    expect(connectors.length).toBeGreaterThan(0);
    expect(intensifiers.length).toBeGreaterThan(0);
    expect(reactions.length).toBeGreaterThan(0);
    expect(slang.length).toBeGreaterThan(0);
    expect(reasons.length).toBeGreaterThan(0);
    expect(memes.length).toBeGreaterThan(0);
  });

  test('allWords export should contain all categories', () => {
    expect(Object.keys(allWords)).toContain('subjects');
    expect(Object.keys(allWords)).toContain('verbs');
    expect(Object.keys(allWords)).toContain('futureVerbs');
    expect(Object.keys(allWords)).toContain('negativeVerbs');
    expect(Object.keys(allWords)).toContain('objects');
    expect(Object.keys(allWords)).toContain('adjectives');
    expect(Object.keys(allWords)).toContain('locations');
    expect(Object.keys(allWords)).toContain('timeExpressions');
    expect(Object.keys(allWords)).toContain('curseWords');
    expect(Object.keys(allWords)).toContain('curseAdjectives');
    expect(Object.keys(allWords)).toContain('exclamations');
    expect(Object.keys(allWords)).toContain('questionWords');
    expect(Object.keys(allWords)).toContain('connectors');
    expect(Object.keys(allWords)).toContain('intensifiers');
    expect(Object.keys(allWords)).toContain('reactions');
    expect(Object.keys(allWords)).toContain('slang');
    expect(Object.keys(allWords)).toContain('reasons');
    expect(Object.keys(allWords)).toContain('memes');
  });
});

describe('Generator Functions', () => {
  test('generateSentence should return a non-empty string', () => {
    const sentence = generateSentence();
    expect(sentence).toBeTruthy();
    expect(typeof sentence).toBe('string');
    expect(sentence.length).toBeGreaterThan(0);
  });

  test('generateSentence should end with punctuation', () => {
    for (let i = 0; i < 50; i++) {
      const sentence = generateSentence();
      expect(sentence).toMatch(/[.!?]$/);
    }
  });

  test('generateSentence should start with capital letter', () => {
    for (let i = 0; i < 50; i++) {
      const sentence = generateSentence();
      expect(sentence[0]).toBe(sentence[0].toUpperCase());
    }
  });

  test('generateParagraph should return multiple sentences', () => {
    const paragraph = generateParagraph({ sentencesPerParagraph: { min: 4, max: 7 } });
    // Count sentences by punctuation
    const sentenceCount = (paragraph.match(/[.!?]/g) || []).length;
    expect(sentenceCount).toBeGreaterThanOrEqual(4);
    expect(sentenceCount).toBeLessThanOrEqual(7);
  });

  test('generateIpsum should return correct number of paragraphs', () => {
    const result = generateIpsum({ paragraphs: 5 });
    expect(result).toHaveLength(5);
  });

  test('curse level affects content', () => {
    // Generate lots of text at each curse level
    const lowText = generateManyTexts(20, 'low');
    const yawaText = generateManyTexts(20, 'yawa');

    // Count curse words in each
    let lowCurseCount = 0;
    let yawaCurseCount = 0;

    curseWords.forEach(word => {
      const lowMatches = (lowText.match(new RegExp(word, 'gi')) || []).length;
      const yawaMatches = (yawaText.match(new RegExp(word, 'gi')) || []).length;
      lowCurseCount += lowMatches;
      yawaCurseCount += yawaMatches;
    });

    // Yawa level should have more curse words than low
    expect(yawaCurseCount).toBeGreaterThan(lowCurseCount);
  });
});

describe('Word Coverage Tests', () => {
  // Generate a large corpus of text for testing
  const largeCorpus = generateManyTexts(500, 'yawa');

  test('subjects should appear in generated text', () => {
    const foundSubjects = subjects.filter(word => wordAppears(word, largeCorpus));
    const coverage = (foundSubjects.length / subjects.length) * 100;
    console.log(`Subjects coverage: ${foundSubjects.length}/${subjects.length} (${coverage.toFixed(1)}%)`);

    const missingSubjects = subjects.filter(word => !wordAppears(word, largeCorpus));
    if (missingSubjects.length > 0) {
      console.log('Missing subjects:', missingSubjects);
    }

    expect(coverage).toBeGreaterThan(80);
  });

  test('verbs should appear in generated text', () => {
    const foundVerbs = verbs.filter(word => wordAppears(word, largeCorpus));
    const coverage = (foundVerbs.length / verbs.length) * 100;
    console.log(`Verbs coverage: ${foundVerbs.length}/${verbs.length} (${coverage.toFixed(1)}%)`);

    const missingVerbs = verbs.filter(word => !wordAppears(word, largeCorpus));
    if (missingVerbs.length > 0) {
      console.log('Missing verbs:', missingVerbs);
    }

    expect(coverage).toBeGreaterThan(80);
  });

  test('futureVerbs should appear in generated text', () => {
    const foundFutureVerbs = futureVerbs.filter(word => wordAppears(word, largeCorpus));
    const coverage = (foundFutureVerbs.length / futureVerbs.length) * 100;
    console.log(`Future verbs coverage: ${foundFutureVerbs.length}/${futureVerbs.length} (${coverage.toFixed(1)}%)`);

    const missingFutureVerbs = futureVerbs.filter(word => !wordAppears(word, largeCorpus));
    if (missingFutureVerbs.length > 0) {
      console.log('Missing future verbs:', missingFutureVerbs);
    }

    expect(coverage).toBeGreaterThan(80);
  });

  test('adjectives should appear in generated text', () => {
    const foundAdjectives = adjectives.filter(word => wordAppears(word, largeCorpus));
    const coverage = (foundAdjectives.length / adjectives.length) * 100;
    console.log(`Adjectives coverage: ${foundAdjectives.length}/${adjectives.length} (${coverage.toFixed(1)}%)`);

    const missingAdjectives = adjectives.filter(word => !wordAppears(word, largeCorpus));
    if (missingAdjectives.length > 0) {
      console.log('Missing adjectives:', missingAdjectives);
    }

    expect(coverage).toBeGreaterThan(80);
  });

  test('locations should appear in generated text', () => {
    const foundLocations = locations.filter(word => wordAppears(word, largeCorpus));
    const coverage = (foundLocations.length / locations.length) * 100;
    console.log(`Locations coverage: ${foundLocations.length}/${locations.length} (${coverage.toFixed(1)}%)`);

    const missingLocations = locations.filter(word => !wordAppears(word, largeCorpus));
    if (missingLocations.length > 0) {
      console.log('Missing locations:', missingLocations);
    }

    expect(coverage).toBeGreaterThan(70);
  });

  test('curseWords should appear in generated text', () => {
    const foundCurseWords = curseWords.filter(word => wordAppears(word, largeCorpus));
    const coverage = (foundCurseWords.length / curseWords.length) * 100;
    console.log(`Curse words coverage: ${foundCurseWords.length}/${curseWords.length} (${coverage.toFixed(1)}%)`);

    const missingCurseWords = curseWords.filter(word => !wordAppears(word, largeCorpus));
    if (missingCurseWords.length > 0) {
      console.log('Missing curse words:', missingCurseWords);
    }

    expect(coverage).toBeGreaterThan(80);
  });

  test('exclamations should appear in generated text', () => {
    const foundExclamations = exclamations.filter(word => wordAppears(word, largeCorpus));
    const coverage = (foundExclamations.length / exclamations.length) * 100;
    console.log(`Exclamations coverage: ${foundExclamations.length}/${exclamations.length} (${coverage.toFixed(1)}%)`);

    const missingExclamations = exclamations.filter(word => !wordAppears(word, largeCorpus));
    if (missingExclamations.length > 0) {
      console.log('Missing exclamations:', missingExclamations);
    }

    expect(coverage).toBeGreaterThan(70);
  });

  test('memes should appear in generated text', () => {
    const foundMemes = memes.filter(word => wordAppears(word, largeCorpus));
    const coverage = (foundMemes.length / memes.length) * 100;
    console.log(`Memes coverage: ${foundMemes.length}/${memes.length} (${coverage.toFixed(1)}%)`);

    const missingMemes = memes.filter(word => !wordAppears(word, largeCorpus));
    if (missingMemes.length > 0) {
      console.log('Missing memes:', missingMemes);
    }

    expect(coverage).toBeGreaterThan(70);
  });

  test('slang should appear in generated text', () => {
    const foundSlang = slang.filter(word => wordAppears(word, largeCorpus));
    const coverage = (foundSlang.length / slang.length) * 100;
    console.log(`Slang coverage: ${foundSlang.length}/${slang.length} (${coverage.toFixed(1)}%)`);

    const missingSlang = slang.filter(word => !wordAppears(word, largeCorpus));
    if (missingSlang.length > 0) {
      console.log('Missing slang:', missingSlang);
    }

    expect(coverage).toBeGreaterThan(70);
  });

  test('reactions should appear in generated text', () => {
    const foundReactions = reactions.filter(word => wordAppears(word, largeCorpus));
    const coverage = (foundReactions.length / reactions.length) * 100;
    console.log(`Reactions coverage: ${foundReactions.length}/${reactions.length} (${coverage.toFixed(1)}%)`);

    const missingReactions = reactions.filter(word => !wordAppears(word, largeCorpus));
    if (missingReactions.length > 0) {
      console.log('Missing reactions:', missingReactions);
    }

    expect(coverage).toBeGreaterThan(70);
  });

  test('overall word coverage summary', () => {
    const allCategories = [
      { name: 'subjects', words: subjects },
      { name: 'verbs', words: verbs },
      { name: 'futureVerbs', words: futureVerbs },
      { name: 'negativeVerbs', words: negativeVerbs },
      { name: 'objects', words: objects },
      { name: 'adjectives', words: adjectives },
      { name: 'locations', words: locations },
      { name: 'timeExpressions', words: timeExpressions },
      { name: 'curseWords', words: curseWords },
      { name: 'curseAdjectives', words: curseAdjectives },
      { name: 'exclamations', words: exclamations },
      { name: 'questionWords', words: questionWords },
      { name: 'connectors', words: connectors },
      { name: 'intensifiers', words: intensifiers },
      { name: 'reactions', words: reactions },
      { name: 'slang', words: slang },
      { name: 'reasons', words: reasons },
      { name: 'memes', words: memes },
    ];

    console.log('\n=== WORD COVERAGE SUMMARY ===\n');

    let totalWords = 0;
    let totalFound = 0;

    allCategories.forEach(({ name, words }) => {
      const found = words.filter(word => wordAppears(word, largeCorpus));
      const coverage = (found.length / words.length) * 100;
      totalWords += words.length;
      totalFound += found.length;

      const status = coverage >= 80 ? '✓' : coverage >= 60 ? '~' : '✗';
      console.log(`${status} ${name}: ${found.length}/${words.length} (${coverage.toFixed(1)}%)`);
    });

    const overallCoverage = (totalFound / totalWords) * 100;
    console.log(`\n=== OVERALL: ${totalFound}/${totalWords} (${overallCoverage.toFixed(1)}%) ===\n`);

    expect(overallCoverage).toBeGreaterThan(70);
  });
});
