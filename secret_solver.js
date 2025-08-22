const fs = require('fs');


function convertToDecimal(value, base) {
    let result = 0;
    const digits = "0123456789abcdefghijklmnopqrstuvwxyz";
    
    for (let i = 0; i < value.length; i++) {
        const digit = digits.indexOf(value[i].toLowerCase());
        result = result * base + digit;
    }
    
    return result;
}

function findSecret(points, k) {
    const selectedPoints = points.slice(0, k);
    let secret = 0;
    
    for (let i = 0; i < selectedPoints.length; i++) {
        const xi = selectedPoints[i].x;
        const yi = selectedPoints[i].y;
        
        let li = 1;
        for (let j = 0; j < selectedPoints.length; j++) {
            if (i !== j) {
                const xj = selectedPoints[j].x;
                li = li * (0 - xj) / (xi - xj);
            }
        }
        
        secret += yi * li;
    }
    
    return Math.round(secret);
}


function solveShamirSecretSharing(jsonData) {
    const n = jsonData.keys.n;
    const k = jsonData.keys.k;
    
    
    
    const points = [];
    
    for (let i = 1; i <= n; i++) {
        if (jsonData[i.toString()]) {
            const base = parseInt(jsonData[i.toString()].base);
            const value = jsonData[i.toString()].value;
            
            const x = i;
            const y = convertToDecimal(value, base);
            points.push({ x, y });
            
            console.log(`Share ${i} ${value} (base ${base})${y}`);
        }
    }
    
    const secret = findSecret(points, k);
    console.log(`Secret found: ${secret}`);
    
    return secret;
}

const testCase1 = readFromJsonFile('testcase1.json');
const testCase2 = readFromJsonFile('testcase2.json');

let secret1, secret2;

if(testCase1) {
    
    secret1 = solveShamirSecretSharing(testCase1);
    console.log(`\nResult: ${secret1}`);
}

if(testCase2) {
    
    secret2 = solveShamirSecretSharing(testCase2);
    console.log(`\nResult: ${secret2}`);
}

console.log(`\nFinal Results:`);
console.log(`Result 1: ${secret1}`);
console.log(`Result 2: ${secret2}`);
console.log(`let's meet in another round`);

function readFromJsonFile(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return null;
    }
}
