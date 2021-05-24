const mutantController = require('../BusinessLayer/mutant');

test('Verify a non mutant human', () => {
    const dna = ["ATGCGA",
                 "CAGTGC",
                 "TTATTT",
                 "AGACGG",
                 "GCGTCA",
                 "TCACTG"];

    const result = mutantController.isMutant(dna);
    expect(result).toBe(false);
});

test('Verify a mutant human', () => {
    const dna = ["ATGCGA",
                 "CAGTGC",
                 "TTATGT",
                 "AGAAGG",
                 "CCCCTA",
                 "TCACTG"];

    const result = mutantController.isMutant(dna);
    expect(result).toBe(true);
});