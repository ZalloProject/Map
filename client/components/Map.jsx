import React from 'react';
import _ from 'lodash';
import style from './styles.css';
import { compose, withProps } from 'recompose';
import { GoogleMap, withGoogleMap, withScriptjs, Circle } from 'react-google-maps';
import Marker from './Marker.jsx';
let count = 0;
const ZalloMap = ({ houses, lat, lng, tilesLoaded, boundsChange }) => {
  let key = 0;
  const refs = {};
  const hoverChange = _.debounce(context => {
    !document.getElementById('infobox') && context.setState({ hovered: true });
  }, 300);
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat, lng }}
      onTilesLoaded={
        tilesLoaded ||
        (() => {
          console.log('loaded');
        })
      }
      ref={map => {
        refs.map = map;
      }}
      onBoundsChanged={e => boundsChange(refs.map.getBounds().toJSON())}
    >
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
    containerElement: (
      <div className="googleMapContainer" style={{ height: `85vh`, width: `55vw` }} />
    ),
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(ZalloMap);
