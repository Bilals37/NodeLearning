const fs = require('fs');


// Sync way of File System Module


// readfile

// const file = fs.readFileSync('file1.txt', 'utf-8')
// console.log(file);

// writeFile

const file = fs.writeFileSync('file2', 'How you Doing?')


// Delete File

// fs.unlinkSync('file1.txt')















// Async way of File System Module

// ReadFile

// fs.readFile('file1.txt', 'utf-8', (err, data) => {
//     console.log(err);
//     console.log(data);
// })

// write File

fs.writeFile('file2', 'How you Doing?\n', (err) => {
    console.log(err);
})


// Delete File

// fs.unlink('file2',(err)=>{
//     console.log(err);
// })

// AppendFil => It is use to Update the data of file

fs.appendFile('file2', 'I am Good HBU', (err) => {
    console.log(err);
})