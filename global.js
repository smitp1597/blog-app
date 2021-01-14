// global objects

// console.log(global);

//runs one time after 4 seconds (4k miliseconds)
global.setTimeout(() => {
    console.log('in the timeout');
    clearInterval(int); //stops the setInterval()
}, 4000);

//runs every second 
const int = global.setInterval(() => {
   console.log('in the interval');
}, 1000);

//current file directories
console.log(__dirname);
console.log(__filename);
