const app = require('../app');
const mutantController = require('../BusinessLayer/mutant');
const humanManager = require('../PersistenceLayer/humanDB');
const statsManager = require('../PersistenceLayer/humanStatsDB');

test('converts a matrix into string', () => {
    const matrix = ["ABC", "DEF", "GHI"];
    expect(app.DNAToStr(matrix)).toBe("ABCDEFGHI");
});

test('verify a non existent human', async() => {
    const matrix = ["CTGCT", 
                    "GCTGC", 
                    "TGCTG",
                    "CTGCT", 
                    "GCTGC"];
    const dnaStr = "CTGCTGCTGCTGCTGCTGCTGCTGC";
    const resp = {Item: null};
    humanManager.getHuman = jest.fn((str) => resp);
    humanManager.saveHuman = jest.fn((str, isMutant) => {});
    statsManager.updateStats = jest.fn((mutants, humans) => {});
    mutantController.isMutant = jest.fn((dna) => false);
    const result = await app.isMutantDNA(dnaStr, matrix);
    expect(result).toBe(false);
});

test('verify an existent human', async() => {
    const matrix = ["CTGCT", 
                    "GCTGC", 
                    "TGCTG",
                    "CTGCT", 
                    "GCTGC"];
    const dnaStr = "CTGCTGCTGCTGCTGCTGCTGCTGC";
    const resp = {Item: {
        ID: "CTGCTGCTGCTGCTGCTGCTGCTGC",
        isMutant: false
    }};
    humanManager.getHuman = jest.fn((str) => resp);
    humanManager.saveHuman = jest.fn((str, isMutant) => {});
    statsManager.updateStats = jest.fn((mutants, humans) => {});
    mutantController.isMutant = jest.fn((dna) => false);
    const result = await app.isMutantDNA(dnaStr, matrix);
    expect(result).toBe(false);
});

test('verify a non existent mutant', async() => {
    const matrix = ["CCCCT", 
                    "CCTGC", 
                    "CGCTG",
                    "CTGCT", 
                    "GCTGC"];
    const dnaStr = "CCCCTCCTGCCGCTGCTGCTGCTGC";
    const resp = {Item: null};
    humanManager.getHuman = jest.fn((str) => resp);
    humanManager.saveHuman = jest.fn((str, isMutant) => {});
    statsManager.updateStats = jest.fn((mutants, humans) => {});
    mutantController.isMutant = jest.fn((dna) => true);
    const result = await app.isMutantDNA(dnaStr, matrix);
    expect(result).toBe(true);
});

test('verify an existent mutant', async() => {
    const matrix = ["CCCCT", 
                    "CCTGC", 
                    "CGCTG",
                    "CTGCT", 
                    "GCTGC"];
    const dnaStr = "CCCCTCCTGCCGCTGCTGCTGCTGC";
    const resp = {Item: {
        ID: "CCCCTCCTGCCGCTGCTGCTGCTGC",
        isMutant: true
    }};
    humanManager.getHuman = jest.fn((str) => resp);
    humanManager.saveHuman = jest.fn((str, isMutant) => {});
    statsManager.updateStats = jest.fn((mutants, humans) => {});
    mutantController.isMutant = jest.fn((dna) => true);
    const result = await app.isMutantDNA(dnaStr, matrix);
    expect(result).toBe(true);
});