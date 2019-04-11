import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render, configure } from 'enzyme';
import { spy } from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import HouseMap from './components/HouseMap.jsx';
configure({ adapter: new Adapter() });

spy(HouseMap.prototype, 'render');

describe('<HouseMap />', () => {
  it('calls render', () => {
    let wrapper = mount(<HouseMap />);
    expect(HouseMap.prototype.render.callCount).to.be.greaterThan(0);
  });
  it('filters houses', () => {});
});
