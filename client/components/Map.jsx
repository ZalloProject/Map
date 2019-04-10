import React from 'react';
import style from './styles.css';
import { compose, withProps } from 'recompose';
import { GoogleMap, withGoogleMap, withScriptjs, Circle } from 'react-google-maps';
import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel';
class ZalloMap extends React.Component {
  constructor(props) {
    super();
    this.state = {
      lat: 33.4,
      lng: -111.9,
      // zoom: 10,
      houses: []
    };
  }
  componentWillMount() {
    fetch('http://zallosimilarhomesservice-env.3cy6gkds47.us-east-2.elasticbeanstalk.com/homes')
      .then(res => res.json())
      .then(houses => this.setState({ houses }));
  }
  componentDidUpdate() {
    console.log('ee');
  }
  onZoomChanged() {
    console.log('aa');
  }
  getPath(lat, lng) {
    let path = [];
    let radius = 0.005;
    let sides = 30; // this number - 1 sided polygon
    for (let i = 0; i < sides; i++) {
      path.push({
        lat: lat + radius * Math.sin((i * Math.PI * 2) / sides),
        lng: lng + radius * Math.cos((i * Math.PI * 2) / sides)
      });
    }
    return path;
  }
  render() {}
}
const map = ({ houses, lat, lng, handleClick, handleMouseOver }) => {
  let key = 0;
  return (
    <GoogleMap defaultZoom={10} defaultCenter={{ lat, lng }}>
      {houses.map(house => {
        return house.lat !== undefined ? (
          <MarkerWithLabel
            onClick={handleClick}
            key={key++}
            position={{ lat: house.lat, lng: house.lng }}
            labelAnchor={new google.maps.Point(17, -0.1)}
            labelStyle={{
              backgroundColor: '#faf7f4',
              color: '#5f5f5f',
              fontSize: '12px',
              fontFamily: '"Open Sans",Gotham,gotham,Tahoma,Geneva,sans-serif',
              boxShadow: '0 1px #ccc',
              margin: '5px'
            }}
            onMouseOver={e => {
              console.log(e);
              if (e.va) {
                e.va.target.src =
                  'https://secure-ds.serving-sys.com/resources/PROD/asset/105657/IMAGE/20190402/300x250_RACHEL_44476714519120408.jpg';
              }
            }}
            icon={{
              url:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Red_Circle%28R%3D204%2CGB%3D0%29.svg/2000px-Red_Circle%28R%3D204%2CGB%3D0%29.svg.png',
              scaledSize: new google.maps.Size(10, 10)
            }}
          >
            <div>${Math.round(house.price / 1000)}k</div>
          </MarkerWithLabel>
        ) : null;
      })}
    </GoogleMap>
  );
};
export default compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyAktQ4K--QUuTF-hgM5SJQzOCvQ894dqgo',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `50vw`, width: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(map);
