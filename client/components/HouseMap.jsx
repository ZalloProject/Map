import React from 'react';
import style from './styles.css';
import ZalloMap from './Map.jsx';
import _ from 'lodash';

class HouseMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      houses: props.houses || null,
      filteredHouses: null,
      markerHovered: false,
      houseView: false,
      filter: null,
      filterDetail: null,
      bounds: null
    };
    this.debouncedFetch = _.debounce(() => {
      let { south, north, east, west } = this.state.bounds;
      fetch(
        `http://zallosimilarhomesservice-env.3cy6gkds47.us-east-2.elasticbeanstalk.com/homesByCoord/${south}&${north}&${east}&${west}`
      )
        .then(res => res.json())
        .then(houses => this.setState({ houses }))
        .then(() => this.filterHouses())
        .then(() =>
          window.dispatchEvent(new CustomEvent('houses', { detail: { houses: this.state.houses } }))
        );
    }, 1000);
  }
  componentWillMount() {
    fetch('http://zallosimilarhomesservice-env.3cy6gkds47.us-east-2.elasticbeanstalk.com/homes')
      .then(res => res.json())
      .then(houses => this.setState({ houses, filteredHouses: houses }));
    window.addEventListener('beds_change', e => this.updateFilter(e));
    window.addEventListener('price_change', e => this.updateFilter(e));
    window.addEventListener('options', e => this.updateFilter(e));
    window.addEventListener('house_view', e => this.setState({ houseView: e.detail.houseView }));
  }
  updateFilter(e) {
    console.log(e);
    this.setState({ filter: e.type, filterDetail: e.detail }, () => {
      this.filterHouses();
    });
  }
  filterHouses() {
    switch (this.state.filter) {
      case 'beds_change': {
        let houses = this.state.houses;
        houses = houses.filter(house => house.beds >= this.state.filterDetail.beds);
        this.setState({ filteredHouses: houses });
        break;
      }
      case 'price_change': {
        let houses = this.state.houses;
        houses = houses.filter(
          house =>
            house.price >= this.state.filterDetail.low &&
            house.price <= this.state.filterDetail.high
        );
        this.setState({ filteredHouses: houses });
        break;
      }
      case 'options': {
        let houses = this.state.houses;
        houses = houses.filter(house => this.state.filterDetail.options.includes(house.homeType));
        this.setState({ filteredHouses: houses }, () => console.log(this.state.filteredHouses));
      }
      case null: {
        this.setState({ filteredHouses: this.state.houses });
      }
    }
  }

  boundsChange(bounds) {
    this.setState({ bounds }, this.debouncedFetch);
  }
  render() {
    return (
      <div>
        <ZalloMap
          houses={this.state.filteredHouses}
          tilesLoaded={this.props.tilesLoaded}
          lat={33.4}
          lng={-111.9}
          boundsChange={this.boundsChange.bind(this)}
        />
        <div
          id="mainContainer"
          className={style.mainContainer}
          style={
            this.state.houseView
              ? {
                  width: '80%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: '5%',
                  backgroundColor: 'white',
                  padding: '5px'
                }
              : { display: 'none' }
          }
        >
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
              X
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default HouseMap;
