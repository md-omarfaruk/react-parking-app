const fs = require('fs');

const getDbCars = () => {
    return new Promise ((resolved, reject)=> {
        fs.readFile('./db.json', 'utf-8', (err, data)=> {
            const cars = JSON.parse(data)
            resolved(cars)
        });
    }) 
};

const insertDbCars = (cars) =>{
    return new Promise ((resolved, reject)=> {
        fs.writeFile('./db.json', JSON.stringify(cars), (err)=> {
            resolved("Successfully car added to park in garage");
        });
    })
}

module.exports.getDbCars = getDbCars;
module.exports.insertDbCars = insertDbCars;