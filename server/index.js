const express = require('express');
const app = express();
const port = 3001;
const db = require('./module');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  const addCar = req.body;
  db.getDbCars()
      .then(data => res.send(data))
  });

app.post('/addNewCar', (req, res) => {
  const addCar = req.body;
  db.getDbCars()
  .then(cars => {
      cars.push(addCar);
      db.insertDbCars(cars)
      .then(data => res.send(cars))
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});