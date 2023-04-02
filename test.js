console.log(Date());

let date = new Date()

//test

// Set the value
let dt = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
    '-' + date.getDate().toString().padStart(2, 0);

console.log(dt)