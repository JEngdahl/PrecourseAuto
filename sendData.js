const fs = require("fs");
const scorePoster = require("./scorePoster")

location = process.argv[process.argv.length - 3];
fs.readFile(location, 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    score = data.split("").reduce((acc, ele) => parseInt(acc,10) + parseInt(ele,10));
    console.log("score in send data is", score)
    scorePoster(score)
})