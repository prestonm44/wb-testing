import { jest } from '@jest/globals';

jest.unstable_mockModule('../words.js', () => {
    return {
      getWord: jest.fn(() => 'APPLE'),
      isWord: jest.fn(() => true),
    };
  });

const { Wordle, buildLetter } = await import('../wordle.js');


describe('building a letter object', () => {
    test('return a letter object', () => {
        const letter = buildLetter('A', 'PRESENT');
        expect(letter).toEqual({ letter: 'A', status: 'PRESENT' })
    })
})


describe('constructing a new Wordle game', () => {
    test('sets maxGuesses to 6 if no argument is passed', () => {
        const wordle = new Wordle()
        expect(wordle.maxGuesses).toBe(6)
    })

    test('sets maxGuesses to the argument passed', () => {
        const wordle = new Wordle(10);
        expect(wordle.maxGuesses).toBe(10);
    })

    test('sets guesses to an array of length maxGuesses', () => {
        const wordle = new Wordle();
        expect(wordle.guesses.length).toBe(6)
    })

    test('sets current guess to 0', () => {
        const wordle = new Wordle();
        expect(wordle.currGuess).toBe(0);
    })
    
    test('sets word to a word from getWord', () => {
        const wordle = new Wordle();
        expect(wordle.word).toBe('APPLE')
    })

    test('sets the status of a correct letter to CORRECT', () => {
        const wordle = new Wordle();
        const guess = wordle.buildGuessFromWord('A____');
        expect(guess[0].status).toBE('CORRECT')
    })

    test('sets the status of a present letter to PRESENT', () => {
        const wordle = new Wordle();
        const guess = wordle.buildGuessFromWord('E____');
        expect(guess[0].status).toBE('PRESENT')
    })

    test('sets the status of an absent letter to ABSENT', () => {
        const wordle = new Wordle();
        const guess = wordle.buildGuessFromWord('Z____')
        expect(guess[0].status).toBe('ABSENT')
    })
})