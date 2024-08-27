import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Home() {
  const [internetData, setInternetData] = useState([]);
  const [motionData, setMotionData] = useState([]);
  const [latencyData, setLatencyData] = useState([]);
  const [batteryData, setBatteryData] = useState([]);
  const [timeRange, setTimeRange] = useState('last_3_hours');

  useEffect(() => {
    // Function to simulate real-time sensor data
    const generateData = (sensorType) => ({
      time: new Date().toISOString(), // ISO string for easy comparison
      value: sensorType === 'battery' ? Math.floor(Math.random() * 101) : Math.floor(Math.random() * 100) // Different value ranges
    });

    // Update the sensor data every second
    const intervals = {
      internet: setInterval(() => {
        const newData = generateData('internet');
        setInternetData(prevData => [...prevData, newData].slice(-100)); // Keep last 100 data points
      }, 1000),

      motion: setInterval(() => {
        const newData = generateData('motion');
        setMotionData(prevData => [...prevData, newData].slice(-100)); // Keep last 100 data points
      }, 1000),

      latency: setInterval(() => {
        const newData = generateData('latency');
        setLatencyData(prevData => [...prevData, newData].slice(-100)); // Keep last 100 data points
      }, 1000),

      battery: setInterval(() => {
        const newData = generateData('battery');
        setBatteryData(prevData => [...prevData, newData].slice(-100)); // Keep last 100 data points
      }, 1000),
    };

    // Cleanup the intervals on component unmount
    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, []);

  // Function to filter data based on time range
  const filterData = (data) => {
    const now = new Date();
    let startTime;

    switch (timeRange) {
      case 'last_3_hours':
        startTime = new Date(now.getTime() - 3 * 60 * 60 * 1000);
        break;
      case 'last_24_hours':
        startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case 'last_7_days':
        startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'last_30_days':
        startTime = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        startTime = new Date(now.getTime() - 3 * 60 * 60 * 1000);
    }

    return data.filter(entry => new Date(entry.time) >= startTime);
  };

  return (
    <main style={{ padding: '1rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={() => setTimeRange('last_3_hours')} style={{ margin: '0.5rem' }}>Last 3 Hours</button>
        <button onClick={() => setTimeRange('last_24_hours')} style={{ margin: '0.5rem' }}>Last 24 Hours</button>
        <button onClick={() => setTimeRange('last_7_days')} style={{ margin: '0.5rem' }}>Last 7 Days</button>
        <button onClick={() => setTimeRange('last_30_days')} style={{ margin: '0.5rem' }}>Last 30 Days</button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', width: '100%' }}>
        <div style={{ flex: '1 1 calc(50% - 1rem)', minWidth: '500px', height: 400 }}>
          <div className='main-title'>
            <h3>Internet Sensor Graph</h3>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filterData(internetData)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ flex: '1 1 calc(50% - 1rem)', minWidth: '500px', height: 400 }}>
          <div className='main-title'>
            <h3>Motion Sensor Graph</h3>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filterData(motionData)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ flex: '1 1 calc(50% - 1rem)', minWidth: '500px', height: 400 }}>
          <div className='main-title'>
            <h3>Latency Sensor Graph</h3>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filterData(latencyData)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ flex: '1 1 calc(50% - 1rem)', minWidth: '500px', height: 400 }}>
          <div className='main-title'>
            <h3>Battery Sensor Graph</h3>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filterData(batteryData)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#00bfae" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

export default Home;
