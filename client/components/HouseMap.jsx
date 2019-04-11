import React from 'react';
import style from './styles.css';
import ZalloMap from './Map.jsx';

class HouseMap extends React.Component {
  constructor() {
    super();
    this.state = {
      houses: null,
      filteredHouses: null,
      markerHovered: false,
      houseView: false
    };
  }
  componentWillMount() {
    fetch('http://zallosimilarhomesservice-env.3cy6gkds47.us-east-2.elasticbeanstalk.com/homes')
      .then(res => res.json())
      .then(houses => this.setState({ houses, filteredHouses: houses }));
    window.addEventListener('beds_change', e => this.filterHouses(e));
    window.addEventListener('price_change', e => this.filterHouses(e));
    window.addEventListener('options', e => this.filterHouses(e));
    window.addEventListener('house_view', e => this.setState({ houseView: e.detail.houseView }));
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
      case 'options': {
        let houses = this.state.houses;
        houses = houses.filter(house => e.detail.options.includes(house.homeType));
        this.setState({ filteredHouses: houses });
      }
    }
  }
  render() {
    return (
      <div>
        <ZalloMap houses={this.state.filteredHouses} lat={33.4} lng={-111.9} />
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
          <div className={style.bigBOX}>
            <div>
              <div id="photos" />
              <div className={style.containerMid}>
                <div id="gendesc" />
                <div id="form-service" />
              </div>
              <div id="similar-homes" />
            </div>
            <div
              className={style.xOut}
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent('house_view', { detail: { houseView: false } })
                )
              }
            >
              {' '}
              X
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default HouseMap;
