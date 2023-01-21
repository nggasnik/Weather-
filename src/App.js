
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function App() {

  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const unitTypeSymbol = {
    'imperial': '°F',
    'metric': '°C',
    '': 'K',
  };

  //set unit type
  const unitType = 'imperial';
  // const unitType = '';
  // const unitType = 'metric';


  //Make api call to openweathermap api
  async function getWeatherData() {
    try {
      setError();
      setWeatherData([]);
      setLoading(true);

      //get longitude and latitude based on city that user inputs
      let resp = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=0f1ffbc1919a0ee7bbeb3086967d05b9`);
      const lat = resp.data[0].lat;
      const long = resp.data[0].lon;

      console.log(resp)

      //set your api key here
      const apiKey = '';

      //Make weather api call using axios
      const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=0f1ffbc1919a0ee7bbeb3086967d05b9&units=imperial`);
      setWeatherData(weatherData.data.list);

    } catch (e) {
      console.log(47, e);
      setError(e);
    } finally {
      setLoading(false);
    }

  }



  return (
    <>

      {loading ?
        <div className='w-100 min-vh-100 d-flex justify-content-center align-items-center'>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
        : <Container>
          <Row className="d-flex">
            <div className='text-center mt-5'>
              <input onChange={(e) => { setCity(e.target.value) }} />
              <Button className='ms-2' onClick={getWeatherData} variant="primary">Submit</Button>{' '}

              {error ? <div className='text-danger'>
                Can't find city
              </div> : <h3 className='mt-3'>  Weather in {city}
              </h3>}
            </div>

            {weatherData.map((weatherData, index) =>
              <Col sm={4} className="mt-3" key={index}>
                <Card className="p-3 shadow border-0 mt-3 rounded">
                  <div className='d-flex justify-content-between'>
                    <div>
                      {weatherData.dt_txt}
                    </div>
                    <div>

                      Current: {weatherData.main.temp} {unitTypeSymbol[unitType]}
                    </div>
                  </div>
                
                </Card>
              </Col>
            )}
          </Row>

        </Container>
      }

    </>
  );
}

export default App;
