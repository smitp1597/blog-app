const fs = require('fs');

const readStream = fs.createReadStream('./docs/doc3.txt')
const writeStream = fs.createWriteStream('./docs/doc4.txt');

readStream.on('data', (chunk) => {
    console.log('----- new Chunk-----');
    console.log(chunk.toString());
    writeStream.write('\n new chunk \n');
    writeStream.write(chunk.toString());
})