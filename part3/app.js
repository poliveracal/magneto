const stats = require('./PersistenceLayer/statsDB');

const calculateStats = async() => {
    const data = await stats.getStats();
    let result = {
        "count_mutant_dna" : 0,
        "count_human_dna": 0,
        "ratio": 0
    }

    if(data){
        result = {
            "count_mutant_dna" : data.mutants,
            "count_human_dna": data.humans,
            "ratio": data.mutants / data.humans
        };
    }

    return result;
}

module.exports = {
    calculateStats
}