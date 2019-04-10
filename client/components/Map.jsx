import React from 'react';
import style from './styles.css';
import { compose, withProps } from 'recompose';
import { GoogleMap, withGoogleMap, withScriptjs, Circle } from 'react-google-maps';
import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel';
const ZalloMap = ({ houses, lat, lng, handleClick, handleMouseOver }) => {
  let key = 0;
  return (
    <GoogleMap defaultZoom={10} defaultCenter={{ lat, lng }}>
      {houses
        ? houses.map(house => {
            return house.lat !== undefined ? (
              <MarkerWithLabel
                onClick={handleClick}
                key={key++}
                position={{ lat: house.lat, lng: house.lng }}
                labelAnchor={new google.maps.Point(17, -0.1)}
                // labelStyle={{
                //   backgroundColor: '#faf7f4',
                //   color: '#5f5f5f',
                //   fontSize: '12px',
                //   fontFamily: '"Open Sans",Gotham,gotham,Tahoma,Geneva,sans-serif',
                //   boxShadow: '0 1px #ccc',
                //   margin: '5px'
                // }}
                // labelClass={style.label}
                icon={{
                  // url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Red_Circle%28R%3D204%2CGB%3D0%29.svg/2000px-Red_Circle%28R%3D204%2CGB%3D0%29.svg.png',
                  url: '',
                  scaledSize: new google.maps.Size(10, 10)
                }}
              >
                <div className={style.labelContainer}>
                  <div className={style.circle} />
                  <div>${Math.round(house.price / 1000)}k</div>
                </div>
              </MarkerWithLabel>
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
