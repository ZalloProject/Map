import React from 'react';
import style from './styles.css';
import { compose, withProps } from 'recompose';
import { GoogleMap, withGoogleMap, withScriptjs, Circle } from 'react-google-maps';
import Marker from './Marker.jsx';
const ZalloMap = ({ houses, lat, lng, hoverChange }) => {
  let key = 0;
  return (
    <GoogleMap defaultZoom={10} defaultCenter={{ lat, lng }}>
      {houses
        ? houses.map(house => {
            return house.lat !== undefined ? (
              <Marker key={key++} hoverChange={hoverChange} house={house} />
            ) : null;
          })
        : null}
    </GoogleMap>
  );
};
export default compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyAktQ4K--QUuTF-hgM5SJQzOCvQ894dqgo',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `60vh`, width: `50vw` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(ZalloMap);
