const fs = require('fs');

//reading

function read(){
    fs.readFile('./docs/doc1.txt', (err, data) => {
        if(err){
            console.log(err);
        }
        console.log(data.toString());
    })
}

//writing files

fs.writeFile('./docs/doc1.txt', 'hello, xyz', () => {
    read();
})

fs.writeFile('./docs/doc2.txt', 'hello, abc', () => {
    fs.readFile('./docs/doc2.txt', (err, data) => {
        if(err){
            console.log(err);
        }
        console.log(data.toString());
    })
})


