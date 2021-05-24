const horizontalSearch = (M, L, i, j, dna, horizontalMatrix) => {
    if(j < M){
        const previousLength = j > 0 ? horizontalMatrix[i][j-1] : 1;
        if(previousLength === 1){
            let length = 1;
            while(length < L && dna[i][j] === dna[i][j + length]){
                length++;
            }
            horizontalMatrix[i][j] = length;
            return length === L;
        }
        else {
            horizontalMatrix[i][j] = previousLength - 1;
        }
    }
    return false;
}

const verticalSearch = (M, L, i, j, dna, verticalMatrix) => {
    if(i < M){
        const previousLength = i > 0 ? verticalMatrix[i-1][j] : 1;
        if(previousLength === 1){
            let length = 1;
            while(length < L && dna[i][j] === dna[i + length][j]){
                length++;
            }
            verticalMatrix[i][j] = length;
            return length === L;
        }
        else {
            verticalMatrix[i][j] = previousLength - 1;
        }
    }
    return false;
}

const lowerDiagonalSearch = (M, L, i, j, dna, lowerDiagonal) => {
    if(i < M && j < M){
        const previousLength = i > 0 && j > 0? lowerDiagonal[i-1][j-1] : 1;
        if(previousLength === 1){
            let length = 1;
            while(length < L && dna[i][j] === dna[i + length][j + length]){
                length++;
            }
            lowerDiagonal[i][j] = length;
            return length === L;
        }
        else {
            lowerDiagonal[i][j] = previousLength - 1;
        }
    }
    return false;
}

const upperDiagonalSearch = (M, L, i, j, dna, upperDiagonal) => {
    if(i < M && j >= M){
        const previousLength = i > 0 && j > 0? upperDiagonal[i-1][j-L+1] : 1;
        if(previousLength === 1){
            let length = 1;
            while(length < L && dna[i][j] === dna[i + length][j - length]){
                length++;
            }
            upperDiagonal[i][j] = length;
            return length === L;
        }
        else {
            upperDiagonal[i][j] = previousLength - 1;
        }
    }
    return false;
}

//Verify whether a DNA matrix belong to a mutant or not
const isMutant = (dna) => {
    const N = dna.length; //matrix dimension
    const L = 4; //mutant sequence length
    const M = N - L + 1;
    let pendingOccurences = 2; //sequences for identifying a mutant

    const horizontalMatrix = new Array(N); //matrix N x M for horizontal checking
    const verticalMatrix = new Array(M); //matrix M x N for vertical checking
    const lowerDiagonal = new Array(M); //matrix M x M for lower diagonal checking
    const upperDiagonal = new Array(M); //matrix M x M for upper diagonal checking

    for(let i = 0; i < N; i++){
        horizontalMatrix[i] = new Array(M);
        verticalMatrix[i] = new Array(N);
        lowerDiagonal[i] = new Array(M);
        upperDiagonal[i] = new Array(M);
        for(let j = 0; j < N; j++){
            //perform checking in horizontal direction
            if (pendingOccurences > 0 && horizontalSearch(M, L, i, j, dna, horizontalMatrix)) pendingOccurences--;
            //perform checking in vertical direction
            if (pendingOccurences > 0 && verticalSearch(M, L, i, j, dna, verticalMatrix)) pendingOccurences--;
            //perform checking from bottom left to top right
            if (pendingOccurences > 0 && lowerDiagonalSearch(M, L, i, j, dna, lowerDiagonal)) pendingOccurences--;
            //perform checking from top left to bottom right
            if (pendingOccurences > 0 && upperDiagonalSearch(M, L, i, j, dna, upperDiagonal)) pendingOccurences--;
            if(pendingOccurences === 0) return true;
        }
    }

    return false;
}

module.exports = {
    isMutant
}
