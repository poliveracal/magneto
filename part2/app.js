const mutantController = require('./BusinessLayer/mutant');
const humanManager = require('./PersistenceLayer/humanDB');
const statsManager = require('./PersistenceLayer/statsDB');

const DNAToStr = (adn) => {
    const length = adn.length;
    let str = '';
    for(let i = 0; i < length; i++)
        str += adn[i];
    return str;
}

const isMutantDNA = async(dnaStr, dna) => {
    const human = await humanManager.getHuman(dnaStr);
    let result = false;
    if(human.Item) {
        result = human.Item.isMutant;
    } else {
        //should use a transaction to save human DNA and update stats due to data integrity
        result = mutantController.isMutant(dna);
        await humanManager.saveHuman(dnaStr, result);
        const incM = result ? 1 : 0;
        await statsManager.updateStats(incM, 1);
    }

    return result;
}

module.exports = {
    DNAToStr,
    isMutantDNA
}