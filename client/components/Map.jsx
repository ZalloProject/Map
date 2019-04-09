import React from 'react';
import style from './styles.css';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
class ZalloMap extends React.Component {
  constructor(props) {
    super();
    this.state = {
      lat: 33.4,
      lng: -111.9,
      zoom: 10
    };
  }
  componentDidUpdate() {}
  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map
        google={this.props.google}
        style={{ width: '500px', height: '500px' }}
        zoom={this.state.zoom}
        initialCenter={{ lat: this.state.lat, lng: this.state.lng }}
      />
    );
  }
}
export default GoogleApiWrapper({ apiKey: 'AIzaSyAktQ4K--QUuTF-hgM5SJQzOCvQ894dqgo' })(ZalloMap);

//AIzaSyAktQ4K--QUuTF-hgM5SJQzOCvQ894dqgo
