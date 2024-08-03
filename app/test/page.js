'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';

const DataPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the Flask API
    axios.get('http://127.0.0.1:8000/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Data from Flask API</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DataPage;