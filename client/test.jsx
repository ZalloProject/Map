import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render, configure } from 'enzyme';
import { spy } from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import HouseMap from './components/HouseMap.jsx';
import Marker from './components/Marker.jsx';
import Map from './components/Map.jsx';
import style from './components/styles.css';
import googleStub from 'googlemaps-js-api-stub';
configure({ adapter: new Adapter() });

spy(HouseMap.prototype, 'render');

describe('<HouseMap />', () => {
  it('calls render', () => {
    const wrapper = mount(<HouseMap />);
    expect(HouseMap.prototype.render.callCount).to.be.greaterThan(0);
  });
  it('filters houses', done => {
    fetch('http://zallosimilarhomesservice-env.3cy6gkds47.us-east-2.elasticbeanstalk.com/homes')
      .then(res => res.json())
      .then(houses => {
        const wrapper = mount(<HouseMap houses={houses} />);
        let loadedHouses = wrapper.state().houses;
        expect(loadedHouses.length).to.be.greaterThan(0);
        wrapper.setState({ filter: 'beds_change', filterDetail: { beds: 4 } });
        wrapper.instance().filterHouses();
        let filteredHouses = wrapper.state().filteredHouses;
        expect(houses.length !== filteredHouses.length).to.be.true;
        wrapper.setState({ filter: 'priceChange', filterDetail: { low: 200000, high: 300000 } });
        wrapper.instance().filterHouses();
        filteredHouses = wrapper.state().filteredHouses;
        console.log('here');
        expect(houses.length !== filteredHouses.length).to.be.true;
        wrapper.setState({ filter: 'options', filterDetail: { options: ['null'] } });
        wrapper.instance().filterHouses();
        filteredHouses = wrapper.state().filteredHouses;
        console.log('here');
        console.log(filteredHouses.length);
        expect(filteredHouses.length === 0).to.be.true;
      })
      .then(done);

    //   })
    //   .catch(err => console.error(err));
  });
});
