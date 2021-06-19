import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import FiveTemperature from './Pages/FiveTemperature';
import { Container, TemperatureContent } from './styles';
import Routes from './routes';

const App = () => {
  return (
    <Container>
      <Router>
        <TemperatureContent>
          <FiveTemperature />
          <Routes />
        </TemperatureContent>
      </Router>
    </Container>
  );
};

export default App;
