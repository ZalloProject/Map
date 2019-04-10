import React from 'react';
import style from './styles.css';
import ZalloMap from './Map.jsx';

class HouseFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      houses: null
    };
  }
  componentWillMount() {
    fetch('http://zallosimilarhomesservice-env.3cy6gkds47.us-east-2.elasticbeanstalk.com/homes')
      .then(res => res.json())
      .then(houses => this.setState({ houses }));
  }
  render() {
    return <ZalloMap houses={this.state.houses} lat={33.4} lng={-111.9} />;
  }
}
export default HouseFilter;
