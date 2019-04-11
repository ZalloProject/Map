import React from 'react';
import style from './styles.css';
import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import InfoWindow from 'react-google-maps/lib/components/InfoWindow';
class CustomMarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false
    };
  }
  render() {
    return (
      <div>
        <MarkerWithLabel
          position={{ lat: this.props.house.lat, lng: this.props.house.lng }}
          labelAnchor={new google.maps.Point(17, -0.1)}
          onMouseOver={e => {
            !document.getElementById('infobox') && this.setState({ hovered: true });
          }}
          onMouseOut={e => {
            this.setState({ hovered: false });
          }}
          onClick={e => {
            window.dispatchEvent(new CustomEvent('house_view', { detail: { houseView: true } }));
          }}
          icon={{
            url: '',
            scaledSize: new google.maps.Size(10, 10)
          }}
        >
          <div className={style.label}>
            <div className={!this.state.hovered ? style.circle : style.circleHover} />
            <div className={!this.state.hovered ? style.labelPrice : style.labelPriceHover}>
              ${Math.round(this.props.house.price / 1000)}k
            </div>
          </div>
        </MarkerWithLabel>
        {this.state.hovered && !document.getElementById('infobox') && (
          <InfoWindow
            position={new google.maps.LatLng(this.props.house.lat, this.props.house.lng)}
            options={{
              enableEventPropagation: true,
              disableAutoPan: true,
              closeBoxURL: ''
            }}
            onCloseClick={e => this.setState({ hovered: false })}
          >
            <div id="infobox" className={style.infoBoxContainer}>
              <img src={this.props.house.pictureURL} style={{ width: '35px', height: '35px' }} />
              <div className={style.textContainer}>
                <div className={style.price}>${this.props.house.price / 1000}k</div>
                <div className={style.moreInfo}>
                  {this.props.house.beds} bd, {this.props.house.baths} ba
                </div>
              </div>
            </div>
          </InfoWindow>
        )}
      </div>
    );
  }
}
export default CustomMarker;
