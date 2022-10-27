import './App.css';
import car_parking from '../src/car-parking.jpg'
// import Modal from 'react-modal';
import { useEffect, useState } from 'react';

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//   },
// };

// Modal.setAppElement('#root');

function App() {

  let time = new Date();

  const [parkingInfo, setParkingInfo] = useState({
    checkInTime: `${time.getHours()} - ${time.getMinutes()}`,
  })
  const [carInfo, setCarInfo] = useState([]);
  // const [modalIsOpen, setIsOpen] = useState(false);


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setParkingInfo(values => ({...values, [name]: value}))
  }
const handleSubmit = (event) => {
  event.preventDefault();
  setParkingInfo(event);
  fetch('http://localhost:3001/addNewCar', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(parkingInfo)
  })
  .then(res => res.json())
  .then(cars => {
    console.log(cars)
  }) 
  event.target.reset();
  window.location.reload();
}

useEffect(()=> {
  fetch('http://localhost:3001')
  .then(res => res.json())
  .then(cars => setCarInfo(cars));
}, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={car_parking} style={{width: "200px", height: "200px"}} alt="" />
        <br />
      <h3>Now total cars parked in garage {parseInt(carInfo.length)}</h3>
      <br />
        <h2>Fill up to park</h2>
        <form onSubmit={handleSubmit}>
          <label>Vehicle Number</label>
          <br />
        <input type="number" name='vehicleNumber' value={parkingInfo.vehicleNumber} onBlur={handleChange}/>
        <br />
        <label>Driver Name</label>
          <br />
        <input type="text" name='driverName' value={parkingInfo.driverName} onBlur={handleChange}/>
        <br />
        <label>Check In Time</label>
          <br />
        <input type="text" placeholder={`${time.getHours()} - ${time.getMinutes()}`} name='checkInTime' value={parkingInfo.checkInTime} onBlur={handleChange}/>
        <br />
        <label>Check Out Time</label>
          <br />
        <input type="text" placeholder={`${time.getHours()} - ${time.getMinutes()}`} name='checkOutTime' value={parkingInfo.checkOutTime} onBlur={handleChange}/>
        <br />
        <button type='submit'>Add to Park</button>
        </form>
      <br />
      </header>
    </div>
  );
}

export default App;
