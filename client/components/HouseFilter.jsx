import React from 'react';
import style from './styles.css';
import ZalloMap from './Map.jsx';

class HouseFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      houses: null,
      filteredHouses: null,
      markerHovered: false,
      houseView: true
    };
  }
  componentWillMount() {
    fetch('http://zallosimilarhomesservice-env.3cy6gkds47.us-east-2.elasticbeanstalk.com/homes')
      .then(res => res.json())
      .then(houses => this.setState({ houses, filteredHouses: houses }));
    window.addEventListener('beds_change', e => this.filterHouses(e));
    window.addEventListener('price_change', e => this.filterHouses(e));
  }
  updateMarkerHovered(id) {
    let hovered = this.state.markerHovered;
    if (hovered === id) {
      this.setState({ markerHovered: false });
      return true;
    } else if (hovered === false) {
      this.setState({ markerHovered: id });
      return true;
    } else {
      return false;
    }
  }
  filterHouses(e) {
    window.houses = this.state.houses;
    switch (e.type) {
      case 'beds_change': {
        let houses = this.state.houses;
        houses = houses.filter(house => house.beds >= e.detail.beds);
        this.setState({ filteredHouses: houses });
        break;
      }
      case 'price_change': {
        let houses = this.state.houses;
        houses = houses.filter(
          house => house.price >= e.detail.low && house.price <= e.detail.high
        );
        this.setState({ filteredHouses: houses });
        break;
      }
    }
  }
  render() {
    return (
      <div>
        <ZalloMap
          houses={this.state.filteredHouses}
          hoverChange={this.updateMarkerHovered.bind(this)}
          lat={33.4}
          lng={-111.9}
        />
        <button type="button" onClick={e => this.setState({ houseView: !this.state.houseView })}>
          {' '}
          Show house view{' '}
        </button>
        <div
          className={style.mainContainer}
          style={
            this.state.houseView
              ? {
                  width: '1000px',
                  zIndex: 1000,
                  height: '1000px',
                  position: 'absolute',
                  top: 0,
                  left: '5%',
                  backgroundColor: 'white',
                  padding: '5px'
                }
              : { display: 'none' }
          }
        >
          {/* <p style={{ fontSize: '100px' }}>REFRESH FOR NEW HOUSE</p> */}
          <div id="photos" />
          <div className={style.containerMid}>
            <div id="gendesc" />
            <div id="form-service" />
          </div>
          <div id="similar-homes" />
          {/* <script
            async
            defer
            src="https://s3-us-west-1.amazonaws.com/zallo-project-gendesc-service/app-bundle.gz.js"
          >
            {' '}
          </script>
          <script
            async
            defer
            src="https://s3-us-west-1.amazonaws.com/zallosimilarhomes/bundle-gz.js"
          >
            {' '}
          </script>
          <script async defer src="https://s3.us-east-2.amazonaws.com/fecappfiles/bundle.js">
            {' '}
          </script>
          <script
            async
            defer
            src="https://s3-us-west-2.amazonaws.com/agents-zallo/Zallo+Team+Files/form-service/bundleGZ.js"
          >
          </script> */}
        </div>
      </div>
    );
  }
}
export default HouseFilter;
