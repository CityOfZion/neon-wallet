import { TOKENS } from '../../app/core/constants'

const hashToSymbol = hash => {
    const symbol = Object.keys(TOKENS).find(currentSymbol => {
        const currentHash = TOKENS[currentSymbol].networks["1"].hash

        if(currentHash === hash){
            return true;
        }
    });

    return symbol || false;
}

export default hashToSymbol