const fs = require('fs');

const arguments = process.argv;
const relativePathToFile = arguments[2];
const keyToModify = arguments[3];
let valueToSet = arguments[4];

console.log(arguments);

if (Boolean(relativePathToFile) && Boolean(keyToModify) && Boolean(valueToSet)) {
    try {
        console.log('updating file...');
        const file = require(relativePathToFile);
        try {
            valueToSet = JSON.parse(valueToSet);
        } catch {}

        file[keyToModify] = valueToSet;

        fs.writeFile(relativePathToFile, JSON.stringify(file), function writeJSON(error) {
            if (error) return console.log(error);
            console.log('done');
        });

    } catch(err) {
        console.log(err);
    }
} else {
    console.log('invalid args');
}

