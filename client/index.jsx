import React from 'react';
import ReactDOM from 'react-dom';
import ZalloMap from './components/Map.jsx';

fetch('http://zallosimilarhomesservice-env.3cy6gkds47.us-east-2.elasticbeanstalk.com/homes')
  .then(res => res.json())
  .then(houses => {
    ReactDOM.render(
      <ZalloMap houses={houses} lat={33.4} lng={-111.9} />,
      document.getElementById('map')
    );
  });
