import React from 'react';

import { Route } from 'react-router-dom';
import DetailDay from '../Pages/DetailDay';

const Routes: React.FC = () => {
  return <Route exact path="/dayofweek/:day" component={DetailDay} />;
};

export default Routes;
