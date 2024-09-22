import { useState, useEffect} from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import axios from 'axios'
import './index.scss';
function App() {
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api");
      setArray(response.data.fruits);
      console.log(response.data.fruits);
  } catch (error) {
      console.error("Error fetching data:", error);
  }
};

useEffect(() => {
  fetchAPI();
}, []);

return (
  <>
  <div>
    <p>IM REED</p>
  </div>
      {array.length === 0 ? (
          <p>No fruits available</p>
      ) : (
          array.map((fruit, index) => (
              <div key={index}>
                  <p>{fruit}</p>
                  <br />
              </div>
          ))
      )}
  </>
);
};

export default App
