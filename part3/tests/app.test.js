const app = require('../app');
const stats = require('../PersistenceLayer/humanStatsDB');

test('retrieve non existing stats', async() => {
    const expectedValue = {
        "count_mutant_dna" : 0,
        "count_human_dna": 0,
        "ratio": 0
    }
    stats.getStats = jest.fn(() => null);
    const result = await app.calculateStats();
    expect(result).toEqual(expectedValue);
});

test('retrieve existing stats', async() => {
    const expectedValue = {
        "count_mutant_dna" : 5,
        "count_human_dna": 10,
        "ratio": 0.5
    }
    const statsValues = {
        ID: "stats",
        mutantCount: 5,
        humanCount: 10
    };
    stats.getStats = jest.fn(() => statsValues);
    const result = await app.calculateStats();
    expect(result).toEqual(expectedValue);
});