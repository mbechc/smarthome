module.exports = {
  id: 'luxSensor1',
  type: 'http',
  method: 'get',
  address: 'http://localhost:8000/api/luxSensor',
  extract: (data) => data.state.lux
};