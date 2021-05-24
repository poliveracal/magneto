const stats = require('./PersistenceLayer/humanStatsDB');

const calculateStats = async() => {
    const data = await stats.getStats();
    let result = {
        "count_mutant_dna" : 0,
        "count_human_dna": 0,
        "ratio": 0
    }

    if(data){
        result = {
            "count_mutant_dna" : data.mutantCount,
            "count_human_dna": data.humanCount,
            "ratio": data.mutantCount / data.humanCount
        };
    }

    return result;
}

module.exports = {
    calculateStats
}